const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// important files
const dbConnection = require("./configs/dbConnection");
const globalErrorHandler = require("./Middlewares/errorMiddleware");
const ApiError = require("./utils/apiError");
const authRoutes = require("./routes/authRoutes");
const messagesRoutes = require("./routes/messageRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

dbConnection();
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

//handle unhandled routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Could not find this route ${req.originalUrl}`, 400));
});
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection: Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  });
});
