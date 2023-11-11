const express = require("express");
const cors = require("cors");

const app = express();

//const pageRoute = require("/script.js");

app.use(cors());
app.use(express.json());

//app.use("/index", pageRoute);

app.get("/", (req, res) => {
  res.send("CBS mule launcing soon...");
});

app.listen(2000, () => {
  console.log("Server open on port 2000");
});