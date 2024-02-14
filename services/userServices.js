const asyncHandler = require("express-async-handler");
const Qrcode = require("qrcode");

const User = require("../models/userModel");
const ApiError = require("../utils/apiError");

exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const loggedUser = await User.findById(req.user._id);
  if (!loggedUser) {
    return next(
      new ApiError("Something wrong with your auth ,try to login again", 404)
    );
  }
  res.status(200).json({ status: "success", data: loggedUser });
});

exports.updateProfilePic = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.profilePic = req.file.filename;
  await user.save();
  delete user._doc.password;
  return res.status(200).json({ message: "Profile picture uploaded", user });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json({ status: "success", message: "Password updated successfully" });
});

exports.generateQrCode = asyncHandler(async (req, res, next) => {
  const url = `${process.env.BASE_URL}+/api/v1/anonymous/sendMsg/${req.user.userName}`;
  const qrCode = await Qrcode.toDataURL(url);

  return res.status(200).json({
    status: "success",
    message: "QR code generated succesfully",
    data: { qrCode },
  });
});
