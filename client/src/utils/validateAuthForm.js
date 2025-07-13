export const validateAuthForm = ({ email, password, username, isLogin }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Enter a valid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!isLogin && !username.trim()) {
    errors.username = "Username is required";
  }

  return errors;
};
