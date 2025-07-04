const express = require("express");
const router = express.Router();
const {
  login,
  addCustomer,
  searchCustomer,
  updateCustomerDocument,
  deleteCustomerDocument,
} = require("../Controllers/CustomerController");

router.route("/login").post(login);
router.route("/addCustomer").post(addCustomer);
router.route("/:contactNumber").get(searchCustomer);
router.route("/updateDocument/:id").put(updateCustomerDocument);
router.route("/deleteDocument/:id").delete(deleteCustomerDocument);

module.exports = router;
