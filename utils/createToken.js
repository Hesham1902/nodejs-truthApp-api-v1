const jwt = require("jsonwebtoken");

const createToken = (payload, expiresIn = "1d") =>
  jwt.sign(
    {
      payload,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn }
  );
module.exports = createToken;
