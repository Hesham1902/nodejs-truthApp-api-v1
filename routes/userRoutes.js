const express = require("express");

const router = express.Router();

const authService = require("../services/authServices");
const {
  getLoggedUser,
  updateProfilePic,
  generateQrCode,
  changePassword,
} = require("../services/userServices");

const {
  changePasswordValidation,
} = require("../utils/validators/userValidators");

const uploadProfilePic = require("../Middlewares/multerMiddleware");

router.use(authService.isAuth, authService.allowedTo("user"));

router.get("/getLoggedUser", getLoggedUser);
router.put("/uploadProfilePic", uploadProfilePic(), updateProfilePic);
router.get("/generateQrCode", generateQrCode);
router.put("/changePassword", changePasswordValidation, changePassword);
// router.delete("/deleteUser/:userId", deleteUserById);

module.exports = router;
