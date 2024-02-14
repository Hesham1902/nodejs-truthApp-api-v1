const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const validatorMiddleware = require("../../Middlewares/validatorMiddleware");
const ApiError = require("../apiError");
// const User = require("../../models/userModel");

exports.changePasswordValidation = [
  check("oldPassword")
    .notEmpty()
    .withMessage("You must enter the old password")
    .custom(async (oldPassword, { req }) => {
      const isEqual = await bcrypt.compare(oldPassword, req.user.password);
      console.log(isEqual);
      if (!isEqual) {
        throw new ApiError("Invalid old password");
      }
    }),
  check("newPassword")
    .notEmpty()
    .withMessage("New password required")
    .isLength({ min: 6 })
    .withMessage("Too short password")
    .custom((newPassword, { req }) => {
      console.log(newPassword, req.body.oldPassword);
      if (newPassword === req.body.oldPassword) {
        throw new ApiError("same old password");
      }
      if (newPassword !== req.body.confirmNewPassword) {
        throw new ApiError("Confirm password didn't match");
      }
      return true;
    }),
  check("confirmNewPassword")
    .notEmpty()
    .withMessage("Confirm password required"),
  validatorMiddleware,
];
