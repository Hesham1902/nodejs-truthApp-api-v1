const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");
const sendEmail = require("../utils/emailService/sendMail");
const { signupTemplate } = require("../utils/emailService/emailTemplate");

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profilePic: req.body.profilePic,
    gender: req.body.gender,
    isConfirmed: req.body.isConfirmed,
    role: req.body.role,
  });
  const verifyToken = await createToken(user.email, "10m");
  const verifyLink = `${req.protocol}://${req.headers.host}/api/v1/verifyEmail/${verifyToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Account Verification (created by ADMIN)",
      html: signupTemplate(verifyLink),
    });
  } catch (err) {
    throw new ApiError(`Check your connection, email was not sent`);
  }

  res.status(201).json({ status: "Success", verifyToken });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError(`No user found with this id: ${userId}`));
  }
  user.password = req.body.newPassword;
  await user.save();
  return res
    .status(201)
    .json({ status: "Success", message: "password updated !" });
});

exports.deleteUserById = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.status(204).json({ status: "Success" });
});
