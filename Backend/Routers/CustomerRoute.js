const express = require("express");
const router = express.Router();
const {
  login,
  addCustomer,
  searchCustomer,
} = require("../Controllers/CustomerController");

router.route("/login").post(login);
router.route("/addCustomer").post(addCustomer);
router.route("/:contactNumber").get(searchCustomer);

module.exports = router;
