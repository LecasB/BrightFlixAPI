//Create and send token and save in cookie

const sendToken = (user, statusCode, res, req) => {
  //Create JWT Token
  const token = user.getJwtToken();

  //Options for cookie
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
