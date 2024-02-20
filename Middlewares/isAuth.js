const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/apiError");

const User = require("../models/userModel");

const isAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token)
  if (!token) {
    throw new ApiError("You must login to get access to this route", 401);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const loggedUser = await User.findById(decoded.payload);
  if (!loggedUser) {
    throw new ApiError("User not found", 404);
  }
  // Check if the password changed after token generation
  if (loggedUser.passwordChangedAt) {
    const passwordChangedAtTimeStamp = parseInt(
      loggedUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passwordChangedAtTimeStamp > decoded.iat) {
      throw new ApiError(
        "User Recently changed his password, please login again..",
        401
      );
    }
  }
  // check if the user not verified
  if (!loggedUser.isConfirmed) {
    throw new ApiError("Check you mail and verify your account", 401);
  }
  req.user = loggedUser;
  next();
});

module.exports = isAuth;
