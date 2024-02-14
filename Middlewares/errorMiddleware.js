const ApiError = require("../utils/apiError");

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
  
const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const JsonWebTokenErrorHandler = () =>
  new ApiError("Invalid token, please login again..", 401);

const TokenExpiredErrorHandler = () =>
  new ApiError("Token Expired, please get new token..", 401);

const globalError = (err, req, res, next) => {
  console.log("iam in express error handler");
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    // if (err.name === "JsonWebTokenError") err = JsonWebTokenErrorHandler();
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "JsonWebTokenError") err = JsonWebTokenErrorHandler();
    if (err.name === "TokenExpiredError") err = TokenExpiredErrorHandler();
    sendErrorForProd(err, res);
  }
};

module.exports = globalError;
