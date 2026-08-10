const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./validate");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());

//signup
app.post("/signup", async (req, res) => {
  try {
    //validation
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // Enxrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new instance of User model

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error: error });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEv@Tinder$790");
      res.cookie("token", token);
      res.status(200).send(user);
      //  res.status(200).send("Login Successfull!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// To get the profile
app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decodedMsg = await jwt.verify(token, "DEv@Tinder$790");
    const { _id } = decodedMsg;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User doesn't exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// Using Middleware
app.get("/profiles", userAuth, (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// To get a user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.find({ email: userEmail });
    if (user.length === 0) {
      return res.status(404).send("User not found");
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error });
  }
});

// To get all the users for feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error });
  }
});
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
