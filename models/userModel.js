const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "you must enter a name"],
      unique: [true, "username must be unique"],
    },
    email: {
      type: String,
      required: [true, "you must enter a email"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: [true, "you must enter a password"],
    },
    profilePic: {
      type: String,
      default: process.env.DEFAULT_PROFILE_PIC,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user",
    },
  },
  { timestamps: true }
);

const setImageURL = (doc) => {
  if (doc.profilePic) {
    const profilePic = `${process.env.BASE_URL}/users/${doc.profilePic}`;
    doc.profilePic = profilePic;
  }
};

userSchema.post("init", (doc) => {
  setImageURL(doc);
});

userSchema.post("save", (doc) => {
  setImageURL(doc);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
