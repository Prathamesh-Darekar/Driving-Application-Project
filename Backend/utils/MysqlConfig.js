const mysql = require("mysql2/promise");

const connect_sql = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    database: "drivingsoftware",
    password: "uttam@123",
  });
  return connection;
};

module.exports = connect_sql;
