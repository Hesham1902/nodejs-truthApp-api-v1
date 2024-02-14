const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const uploadProfilePic = require("../Middlewares/multerMiddleware");
const Token = require("../models/tokenModel");
const createToken = require("../utils/createToken");
const createHash = require("../utils/createHash");
const sendEmail = require("../utils/emailService/sendMail");
const {
  signupTemplate,
  resetPasswordTemplate,
} = require("../utils/emailService/emailTemplate");

const ApiError = require("../utils/apiError");

exports.multer = uploadProfilePic();

exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.file ? req.file.filename : undefined,
    gender: req.body.gender,
    isConfirmed: false,
  });
  const verifyToken = await createToken(user.email, "10m");
  const verifyLink = `${req.protocol}://${req.headers.host}/api/v1/verifyEmail/${verifyToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Account Verification",
      html: signupTemplate(verifyLink),
    });
  } catch (err) {
    throw new ApiError(`Check your connection, email was not sent`);
  }

  res.status(201).json({ status: "Success", verifyToken, user });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Wrong email or password"));
  }

  const token = await createToken(user._id, "1hr");
  return res.status(200).json({ status: "Success", user, token });
});

exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const { verifyToken } = req.params;
  const decoded = jwt.verify(verifyToken, process.env.JWT_SECRET_KEY);

  const user = await User.findOne({ email: decoded.payload });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  if (user.isConfirmed) {
    throw new ApiError("User already verified", 404);
  }
  await User.findOneAndUpdate(
    { email: decoded.payload },
    { isConfirmed: true }
  );
  return res
    .status(200)
    .json({ status: "Success", message: "Email verified successfully" });
});

exports.isAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
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

exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email });
  if (!user) {
    throw new ApiError("Email not exist", 404);
  }
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  await sendEmail({
    email: user.email,
    subject: "Reset Password confirmation",
    html: resetPasswordTemplate(resetCode),
  });
  const hashedCode = createHash(resetCode);

  const token = await Token.create({
    code: hashedCode.toString(),
    userId: user._id,
    created_at: Date.now(),
  });
  return res
    .status(200)
    .json({ status: "success", message: "Reset code sent to email", token });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { resetCode, newPassword } = req.body;
  const hashedCode = createHash(resetCode);

  const token = await Token.findOne({
    code: hashedCode,
    expireAt: { $gt: Date.now() },
  });
  if (!token) {
    throw new ApiError("Invalid or expired code", 404);
  }
  const user = await User.findById(token.userId);

  user.password = newPassword;
  user.passwordChangedAt = Date.now();

  await user.save();
  await Token.deleteOne({ code: token.code, userId: user._id });
  return res
    .status(200)
    .json({ status: "Success", message: "password updated successfully" });
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });
