const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
});

messageSchema.pre(/^find/, function (next) {
  this.populate({ path: "sender recipient", select: "userName -_id" });
  next();
});

module.exports = mongoose.model("Message", messageSchema);
