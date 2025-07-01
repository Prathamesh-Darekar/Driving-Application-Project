const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./utils/MysqlConfig");
const env = require("dotenv").config();
const customerRoute = require("./Routers/CustomerRoute");

const PORT = process.env.SERVER_PORT;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", customerRoute);

app.listen(PORT, (req, res) => {
  console.log("Server Running!!!");
});
