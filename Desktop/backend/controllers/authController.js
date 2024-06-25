const User = require("../models/users");

//Register a new user => /api/v1/register
exports.registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(200).json({
    sucess: true,
    message: "User is registered.",
    data: user,
  });
};
