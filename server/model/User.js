const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150",
    },
    bio: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

//hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const mysalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, mysalt);
  next();
});

UserSchema.methods.matchPassword = async function (Password) {
  return await bcrypt.compare(Password, this.password);
};

module.exports = mongoose.model("users", UserSchema);
