const express = require("express");

const router = express.Router();

const {
  sendMsgAnon,
  sendMsgAuth,
  getMessageById,
  getRecievedMessages,
  deleteMsgById,
  toggleFav,
  getAllFavMsgs,
  getSentMsgs,
  getAllMsgs,
} = require("../services/messagesService");
const {
  sendMsgValidation,
  sendMsgAuthValidation,
  getMsgValidation,
  deleteMsgValidation,
} = require("../utils/validators/messagesValidators");
const authService = require("../services/authServices");
const isAuth = require("../Middlewares/isAuth");

//Anyone cans end anonymous message
router.post("/anonymous/sendMsg", sendMsgValidation, sendMsgAnon);

//for testing purposes
// router.get("/getAllMsgs", getAllMsgs);
// router.get("/getMessage/:id", getMessageById);

// Authenticated routes
router.use(isAuth,authService.allowedTo('user'));
// send message from user to user
router.post("/Auth/sendMsg", sendMsgAuthValidation, sendMsgAuth);
// get message by id must be yours
router.get("/getMessage/:id", getMsgValidation, getMessageById);
// get all your recieved messages
router.get("/getMessages", getRecievedMessages);
// get all your sent messages
router.get("/getSentMsgs", getSentMsgs);
//get all your favourited messages
router.get("/favMsgs", getAllFavMsgs);
// make the message favorite or remove it
router.put("/toggleFav/:id", toggleFav);
// delete specific message which must be yours
router.delete("/deleteMessage/:id", deleteMsgValidation, deleteMsgById);

module.exports = router;
