const { check } = require("express-validator");

const User = require("../../models/userModel");
const validatorMiddleware = require("../../Middlewares/validatorMiddleware");
const ApiError = require("../apiError");

exports.signupValidator = [
  check("username")
    .notEmpty()
    .withMessage("You must enter a username")
    .custom(async (val, { req }) => {
      const user = await User.findOne({ userName: val });
      if (user) {
        throw new ApiError("This user is already registered");
      }
    }),

  check("email")
    .notEmpty()
    .withMessage("You must enter an E-mail")
    .isEmail()
    .withMessage("Enter a valid email address")
    .custom(async (val, { req }) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new ApiError("This email is already registered");
      }
    }),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),
  validatorMiddleware,
];

exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("You must enter an E-mail")
    .isEmail()
    .withMessage("Enter a valid email address"),

  check("password").notEmpty().withMessage("password required"),
  validatorMiddleware,
];

exports.resetPasswordValidator = [
  check("newPassword")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Too short password"),

  validatorMiddleware,
];
