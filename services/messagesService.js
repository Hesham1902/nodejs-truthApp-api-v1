const asyncHandler = require("express-async-handler");

const Message = require("../models/messageModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.sendMsgAnon = asyncHandler(async (req, res, next) => {
  const { content, reciever } = req.body;
  //Send Anonymous Message
  const message = await Message.create({
    content,
    recipient: reciever,
  });
  return res.status(200).json({ status: "Message Sent Successfully", message });
});

exports.sendMsgAuth = asyncHandler(async (req, res, next) => {
  const { content, reciever } = req.body;
  if (!req.user) {
    throw new ApiError("You must be logged in to send a message");
  }
  const message = await Message.create({
    content,
    sender: req.user._id,
    recipient: reciever,
  });
  return res.status(200).json({ status: "Message Sent Successfully", message });
});

exports.getMessageById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log("Crazy ????????");
  const message = await Message.findById(id);
  if (!message) {
    throw new ApiError("Message not found", 404);
  }
  return res.status(200).json({ status: "Successful", message });
});

exports.getRecievedMessages = asyncHandler(async (req, res, next) => {
  //build query
  const apiFeatures = new ApiFeatures(
    Message.find({ recipient: req.user.userName }),
    req.query
  )
    .sort()
    .limitFields()
    .search();

  //get the final messages count
  const { filteredQuery } = apiFeatures;
  const messagesCount = await Message.countDocuments({
    $and: [{ recipient: req.user.userName }, { filteredQuery }],
  });

  //execute pagination
  const paginatedApiFeatures = apiFeatures.paginate(messagesCount);
  const { mongooseQuery, paginationResult } = paginatedApiFeatures;

  const messages = await mongooseQuery;
  if (!messages) {
    throw new ApiError(
      `There is no messages found for this user ${req.user.userName}`,
      404
    );
  }
  return res.status(200).json({
    status: "Successful",
    result: messages.length,
    paginationResult,
    messages,
  });
});

exports.getSentMsgs = asyncHandler(async (req, res, next) => {
  //build query
  const apiFeatures = new ApiFeatures(
    Message.find({ sender: req.user._id }),
    req.query
  )
    .sort()
    .limitFields()
    .search();

  //get the final messages count
  const { filteredQuery } = apiFeatures;
  const messagesCount = await Message.countDocuments({
    $and: [{ sender: req.user._id }, { filteredQuery }],
  });

  //execute pagination
  const paginatedApiFeatures = apiFeatures.paginate(messagesCount);
  const { mongooseQuery, paginationResult } = paginatedApiFeatures;

  const messages = await mongooseQuery;
  console.log(messages);
  if (!messages) {
    throw new ApiError(
      `There is no messages sent by this user ${req.user.userName}`,
      404
    );
  }
  return res.status(200).json({
    status: "Successful",
    result: messages.length,
    paginationResult,
    messages,
  });
});

exports.deleteMsgById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findByIdAndDelete(id);
  if (!message) {
    throw new ApiError("Message not found to be deleted", 404);
  }
  return res
    .status(204)
    .json({ status: "success", message: "Delete successfully" });
});

exports.toggleFav = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    throw new ApiError("Message not found", 404);
  }
  if (message.recipient !== req.user.userName) {
    throw new ApiError("Not authorized to toggle this message", 403);
  }
  message.isFavourite = !message.isFavourite;
  await message.save();
  return res
    .status(200)
    .json({ status: "success", isFavourite: message.isFavourite });
});

exports.getAllFavMsgs = asyncHandler(async (req, res, next) => {
  const msgs = await Message.find({
    recipient: req.user._id,
    isFavourite: true,
  });
  if (!msgs) {
    throw new ApiError(
      `There is no favourite messages found for this user ${req.user.userName}`,
      404
    );
  }
  return res.status(200).json({ status: "Successful", "Liked Messages": msgs });
});

exports.getAllMsgs = asyncHandler(async (req, res, next) => {
  const messages = await Message.find();
  if (!messages) {
    throw new ApiError(
      `There is no messages sent by this user ${req.user.userName}`,
      404
    );
  }
  return res.status(200).json({
    status: "Successful",
    result: messages.length,
    messages,
  });
});
