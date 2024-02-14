// Require the cloudinary library
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDNAIRY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDNAIRY_API_SECRET,
});

// Log the configuration
module.exports = cloudinary;
