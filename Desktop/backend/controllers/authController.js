const User = require("../models/users");
const ErrorHandeler = require("../util/errorHandler");
const sendToken = require("../util/jwtToken");
//Register a new user => /api/v1/register
exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendToken(user, 200, res);
};

//Login user => /api/v1/login

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //Checks if email or password is entered by user

  if (!email || !password) {
    return next(new ErrorHandeler("Please enter email & Password"), 400);
  }

  //Finding user in db

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandeler("Invalid Email or Password", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Pass", 401));
  }

  sendToken(user, 200, res);
};
