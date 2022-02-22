require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorHandler = require("./helpers/error-handler");
const userRoutes = require("./routes/users/user.controller");
const quizCategoryRoutes = require("./routes/quiz_categories/quiz_categories.controller");

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/quiz-category", quizCategoryRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Express App listening on port ${port}`);
  require("./helpers/db");
});
