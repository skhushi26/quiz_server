require("dotenv").config();
const express = require("express");

const errorHandler = require("./helpers/error-handler");
const userRoutes = require("./routes/users/user.controller");

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use("/user", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express App listening on port ${port}`);
  require("./helpers/db");
});