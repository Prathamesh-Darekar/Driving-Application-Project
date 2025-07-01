const getConnection = require("../utils/MysqlConfig");

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
  const connection = await getConnection();
  let qry = `insert into customer(customerName,contactNumber,address,documentType,documentSubType,totalAmount,applicationDate,applicationStatus,advancePayment,balance,amountPaidDate,notes) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
  const [result] = await connection.execute(qry, [
    customerName,
    contactNumber,
    address,
    documentType,
    documentSubType,
    totalAmount,
    applicationDate,
    applicationStatus,
    advancePayment,
    balance,
    amountPaidDate,
    notes,
  ]);
  if (result.affectedRows == 1) {
    return res.status(201).json({ message: "Record inserted successfully" });
  } else {
    return res.status(500).json({ message: "Record not inserted" });
  }
};

const searchCustomer = async (req, res) => {
  const { contactNumber } = req.params;
  if (!contactNumber)
    return res
      .status(400)
      .json({ message: "Bad request! Enter contact Number" });
  const connection = await getConnection();
  const qry = "select * from customer where contactNumber=?";
  const values = [contactNumber];
  const [result] = await connection.execute(qry, values);
  if (result.length === 0)
    return res
      .status(404)
      .json({ message: "Contact number does not exists in the database" });
  return res.status(200).json({ message: "Success", customerData: result });
};

module.exports = { addCustomer, login, searchCustomer };
