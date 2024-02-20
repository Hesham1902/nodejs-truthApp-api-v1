const jwt = require("jsonwebtoken");

const createToken = (payload, res, expiresIn = "1d") => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });
  console.log(token);
  if (res) {
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    });
  }
  return token;
};
module.exports = createToken;
