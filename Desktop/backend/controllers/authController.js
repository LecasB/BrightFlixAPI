const User = require("../models/users");
const ErrorHandeler = require("../util/errorHandler");
const sendToken = require("../util/jwtToken");
const fs = require('fs');
const path = require('path');

const logFilePath = path.join('./public', 'visitor_logs.txt');


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

  // Checks if email or password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & Password", 400));
  }

  // Finding user in db
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    logLoginAttempt(email, false); // Log failed attempt
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    logLoginAttempt(email, false); // Log failed attempt
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  logLoginAttempt(email, true); // Log successful attempt
  sendToken(user, 200, res);
};

const logLoginAttempt = (email, success) => {
  const logMessage = `${new Date().toISOString()} - User ${email} login ${success ? 'successful' : 'failed'}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file', err);
    }
  });
};

exports.getLogs = (req, res) => {
  console.log('logFilePath:', logFilePath);
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading log file', err);
      return res.status(500).send(logFilePath);
    }
    res.type('text/plain');
    res.send(data);
  });
};



