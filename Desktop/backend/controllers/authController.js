const User = require("../models/users");
const ErrorHandeler = require("../util/errorHandler");
const sendToken = require("../util/jwtToken");
const fs = require("fs");
const path = require("path");


const logFilePath = path.join(__dirname, "../public", "visitor_logs.txt");

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
  const logMessage = `${new Date().toISOString()} - User ${email} login ${
    success ? "successful" : "failed"
  }\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      alert("Error writing to log file", err);
    }
  });
};

exports.getLogs = (req, res) => {
  console.log("logFilePath:", logFilePath);
  fs.readFile(logFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading log file", err); // Log the specific error
      return res.status(500).send(`Error reading log file: ${err.message}`);
    }
    res.type("text/plain");
    res.send(data);
  });
};

exports.updateUser = async (req, res, next) => {
  const newUserDate = {
    name: req.body.name,
    email: req.body.email,
  };

  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      newUserDate,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    // Handle errors
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    // Handle errors
    next(err);
  }
};
