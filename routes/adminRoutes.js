const express = require("express");

const router = express.Router();

const authService = require("../services/authServices");
const {
  createUser,
  changePassword,
  deleteUserById,
} = require("../services/adminServices");

router.use(authService.isAuth, authService.allowedTo("admin"));

router.post("/createUser", createUser);
router.put("/changePassword/:userId", changePassword);
router.delete("/deleteUser/:userId", deleteUserById);

module.exports = router;
