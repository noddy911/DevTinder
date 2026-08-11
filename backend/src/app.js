const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validate");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

const { authRouter } = require("./routes/auth");
const { profileRouter } = require("./routes/profile");

// SignUP
app.use("/", authRouter);
// Login
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Database connection is established");
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });
