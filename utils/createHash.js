const crypto = require("crypto");

const createHash = (resetCode) =>
  crypto.createHash("sha256").update(resetCode).digest("hex");

module.exports = createHash;
