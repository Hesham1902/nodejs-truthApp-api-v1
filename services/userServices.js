const asyncHandler = require("express-async-handler");
const Qrcode = require("qrcode");

const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const cloudinary = require("../utils/cloudinary");

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
  if (!req.file) {
    return next(new ApiError("Profile picture is required", 400));
  }
  const results = await cloudinary.uploader.upload(req.file.path, {
    folder: `Truth/${req.user._id}/profile-pictrue`,
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      "profilePic.public_id": results.public_id,
      "profilePic.secure_url": results.secure_url,
    },
    { new: true }
  );
  delete user._doc.password;
  return res.status(200).json({ message: "Profile picture uploaded", user });
});

exports.deleteProfilePic = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  
  if (!user.profilePic || user.profilePic.public_id == null) {
    return next(new ApiError("There is no profile picture to delete", 400));
  }
  await cloudinary.uploader.destroy(user.profilePic.public_id);

  user.profilePic = {
    secure_url: process.env.DEFAULT_PROFILE_PIC,
    public_id: null,
  };

  await user.save();
  return res.status(200).json({
    status: "sucess",
    message: "Profile picture deleted successfully",
    user,
  });
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
