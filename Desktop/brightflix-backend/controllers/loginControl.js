const Login = require('../models/loginModel');

exports.getLogin = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'This route will display the login page'
  });
}

exports.newLogin = async (req, res, next) => {
  try {
    const login = await Login.create(req.body);
    res.status(201).json({
      success: true,
      message: "Account Created",
      data: login
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating account"
    });
  }
}