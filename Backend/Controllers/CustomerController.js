const Customer = require("../models/UserModel");

const login = async (req, res) => {
  // SEND DATA IN THIS FORMAT
  // {
  //   "email":"admin@gmail.com",
  //   "password":"admin"
  // }
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all the credentials." });
  }
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin";
  if (email.trim() != adminEmail) {
    return res
      .status(401)
      .json({ message: "Unauthorized access!! Invalid email" });
  } else if (password.trim() != adminPassword) {
    return res
      .status(401)
      .json({ message: "Unauthorized access!! Invalid password" });
  }
  return res.status(200).json({ message: "Login Successfull" });
};

const addCustomer = async (req, res) => {
  //  SEND DATA THIS FORMAT
  //   {
  //     "customerName":"ram",
  //     "contactNumber":"90sasdfs876",
  //     "address":"kun",
  //     "documentType":"DL",
  //     "documentSubType":"lcn",
  //     "applicationDate":"12-08-1022",
  //     "applicationStatus":"Applied",
  //     "totalAmount":20000,
  //     "advancePayment":200,
  //     "balance":500,
  //     "amountPaidDate":10000,
  //     "notes":"hello"
  // }

  const {
    customerName,
    contactNumber,
    address,
    documentType,
    documentSubType,
    applicationDate,
    applicationStatus,
    totalAmount,
    advancePayment,
    balance,
    amountPaidDate,
    notes,
  } = req.body;

  if (
    !customerName ||
    !contactNumber ||
    !address ||
    !documentType ||
    !documentSubType ||
    !applicationDate ||
    !applicationStatus ||
    !totalAmount ||
    !advancePayment ||
    !balance ||
    !amountPaidDate ||
    !notes
  ) {
    res.status(400).json({ message: "Bad request! Insufficient data" });
  }
  // res.send(req.body);
  const newEntry = new Customer(req.body);
  await newEntry.save();
  return res.status(200).json({ message: "Record inserted successfully" });
};

const searchCustomer = async (req, res) => {
  const { contactNumber } = req.params;
  if (!contactNumber)
    return res
      .status(400)
      .json({ message: "Bad request! Enter contact Number" });
  const targetCustomer = await Customer.find({ contactNumber });
  if (targetCustomer.length === 0)
    return res
      .status(404)
      .json({ message: "Contact number does not exists in the database" });
  return res
    .status(200)
    .json({ message: "Success", customerData: targetCustomer });
};

module.exports = { login, addCustomer, searchCustomer };
