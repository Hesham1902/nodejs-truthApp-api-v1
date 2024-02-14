const multer = require("multer");
const { uuid } = require("uuidv4");
const ApiError = require("../utils/apiError");

const multerOpts = () => {
  const multerStroage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/users");
    },
    filename: function (req, file, cb) {
      console.log(file);
      const ext = file.mimetype.split("/")[1]; //png
      const filename = `userProfilePic-${uuid()}-${Date.now()}.${ext}`;
      cb(null, filename);
    },
  });
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only images allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStroage, fileFilter: multerFilter });
  return upload;
};

const uploadProfilePic = () => multerOpts().single("profilePic");

module.exports = uploadProfilePic;
