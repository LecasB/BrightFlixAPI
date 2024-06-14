const { default: mongoose } = require("mongoose");

const LoginScheme = new mongoose.Schema({
    loginUser: {
      type: String,
      required: [true, 'Please enter your username'],
      trim: true,
      minlength: [4, 'Password must be at least 4 characters'],
      maxlength: [20, 'Username cannot exceed 20 characters']
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [20, 'Password cannot exceed 20 characters']
    },
  });

  module.exports = mongoose.model("Login", LoginScheme)