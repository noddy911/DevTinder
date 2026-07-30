const express = require("express");

const app = express();
app.use("/test", (req, res) => {
  console.log("This is test route");
  res.send("Hello world");
});
app.use("/h", (req, res) => {
  console.log("This is h route");
  res.send("Hello from h route");
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
