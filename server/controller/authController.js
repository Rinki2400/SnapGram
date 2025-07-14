const User = require("../model/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists..." });
    }

    const newUser = await User.create({ username, email, password });

    const userData = newUser.toObject(); // converts Mongoose doc to plain object
    delete userData.password; // optional: hide password from response

    return res.status(201).json({
      ...userData,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Convert to plain object and exclude password
    const userData = user.toObject();
    delete userData.password;

    // Send full user + token
    return res.status(200).json({
      ...userData,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

