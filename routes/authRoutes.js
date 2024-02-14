const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require("../services/authServices");

const uploadProfilePic = require("../Middlewares/multerMiddleware");

const {
  signupValidator,
  loginValidator,
  resetPasswordValidator,
} = require("../utils/validators/authValidators");

router.post("/signup", uploadProfilePic(), signupValidator, signup);
router.post("/login", loginValidator, login);
router.get("/verifyEmail/:verifyToken", verifyEmail);
router.post("/forgotPassword", forgetPassword);
router.put("/resetPassword", resetPasswordValidator, resetPassword);

module.exports = router;
