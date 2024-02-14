const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expireAt: {
    type: Date,
    default: Date.now() + 10 * 60 * 1000,
    expires: 10 * 60 * 1000,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
