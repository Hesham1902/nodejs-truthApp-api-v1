const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const validatorMiddleware = require("../../Middlewares/validatorMiddleware");
const ApiError = require("../apiError");
const User = require("../../models/userModel");
const Message = require("../../models/messageModel");

exports.sendMsgValidation = [
  check("recieverId")
    .notEmpty()
    .withMessage("Recipient username required!")
    .isMongoId()
    .withMessage("Invalid user id format ")
    .custom(async (val, { req }) => {
      const user = await User.findById(val);
      if (!user) {
        throw new ApiError(`This username: "${val}" not exist`, 404);
      }
    }),
  validatorMiddleware,
];

exports.sendMsgAuthValidation = [
  check("recieverId")
    .notEmpty()
    .withMessage("Must provide recipient username to sent message!")
    .custom(async (val, { req }) => {
      const user = await User.findById(val);
      if (!user) {
        throw new ApiError(`This username: "${val}" not exist`, 404);
      }
      if (user._id.toString() === req.user._id.toString()) {
        throw new ApiError("you can't send yourself a message");
      }
    }),
  validatorMiddleware,
];

exports.getMsgValidation = [
  check("id")
    .isMongoId()
    .withMessage(`Invalid message id format`)
    .custom(async (val, { req }) => {
      const message = await Message.findById(val);
      if (message.recipient.userName !== req.user.userName) {
        throw new ApiError(
          `No messages found for ${req.user.userName} with this id`,
          404
        );
      }
    }),
  validatorMiddleware,
];

exports.deleteMsgValidation = [
  check("id")
    .isMongoId()
    .withMessage(`Invalid message id format`)
    .custom(async (val, { req }) => {
      const message = await Message.findById(val);
      if (message.recipient.userName !== req.user.userName) {
        throw new ApiError(`Not authorized to delete this message`, 404);
      }
    }),
  validatorMiddleware,
];

