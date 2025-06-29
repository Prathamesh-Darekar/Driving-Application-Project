const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const customerRoute = require("./Routers/CustomerRoute");

const PORT = process.env.SERVER_PORT;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("Database Connected");
});

app.use("/api", customerRoute);

app.listen(PORT, (req, res) => {
  console.log("Server Running!!!");
});
