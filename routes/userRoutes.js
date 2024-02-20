const express = require("express");

const router = express.Router();

const authService = require("../services/authServices");
const isAuth = require("../Middlewares/isAuth");
const {
  getLoggedUser,
  updateProfilePic,
  generateQrCode,
  changePassword,
  deleteProfilePic,
} = require("../services/userServices");

const {
  changePasswordValidation,
} = require("../utils/validators/userValidators");

const uploadProfilePic = require("../Middlewares/multerMiddleware");

router.use(isAuth, authService.allowedTo("user"));

router.get("/getLoggedUser", getLoggedUser);
router.put("/uploadProfilePic", uploadProfilePic(), updateProfilePic);
router.delete("/deleteProfilePic", deleteProfilePic);
router.get("/generateQrCode", generateQrCode);
router.put("/changePassword", changePasswordValidation, changePassword);
// router.delete("/deleteUser/:userId", deleteUserById);

module.exports = router;
