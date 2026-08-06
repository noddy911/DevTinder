const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //   Crating a instance of a new user model
  const user = new User(req.body);
  console.log(user);

  try {
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error creating user", error: err });
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
