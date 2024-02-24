const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../../../config.json");

const db = mysql.createConnection({
  user: config.DB_USER,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

router.post("/login", (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;

  const getUserDetailsQuery = "SELECT * FROM users WHERE user_name = ?";

  db.query(getUserDetailsQuery, [userName], (error, results) => {
    if (results.length > 0) {
      const user = results[0];

      if (password === user.password) {
        res.json({ status: "Login success", user: user });
      } else {
        res.json({
          status: "Login failed",
          message: "Login failed. Incorrect password",
        });
      }
    } else {
      res.json({ status: "Login failed", message: "User not found" });
    }
  });
});

//request leave api
router.post("/createUser", (req, res) => {
  const createName = req.body.createName;
  const createUsername = req.body.createUsername;
  const createPassword = req.body.createPassword;
  const createEmail = req.body.createEmail;
  const role = "employee";
  const sickLeaveBalance = 10;
  const paidLeaveBalance = 10;

  let user;
  db.query(
    "INSERT INTO users (user_name,password,email,name,role,sick_leave_balance,paid_leave_balance) VALUES (?,?,?,?,?,?,?) ",
    [
      createUsername,
      createPassword,
      createEmail,
      createName,
      role,
      sickLeaveBalance,
      paidLeaveBalance,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("User Created");
      }
    }
  );
});

module.exports = router;
