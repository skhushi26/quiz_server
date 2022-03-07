const express = require("express");

const quizResultService = require("./quiz_results.service");
const { addQuizResultSchema } = require("./quiz_results.validation");
const authorize = require("../../helpers/authorize");

const router = express.Router();

router.post(
  "/add",
  addQuizResultSchema,
  authorize("user"),
  quizResultService.addResult
);

router.get(
  "/get-all/:userId",
  authorize("user"),
  quizResultService.getQuizScore
);

router.get(
  "/get/:categoryId",
  authorize("user"),
  quizResultService.getResultByCategory
);

module.exports = router;
