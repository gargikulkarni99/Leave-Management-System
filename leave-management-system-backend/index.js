const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const leavesRouter = require("./src/routes/leaves");
const usersRouter = require("./src/routes/user");

app.use(cors());
app.use(express.json());

// Use the route files
app.use("/leave", leavesRouter);
app.use("/user", usersRouter);

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
