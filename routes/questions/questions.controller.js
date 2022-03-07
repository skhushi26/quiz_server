const express = require("express");

const questionService = require("./questions.service");
const {
  addQuestionSchema,
  submitQuestionSchema,
} = require("./questions.validation");
const authorize = require("../../helpers/authorize");

const router = express.Router();

router.get(
  "/get-by-id/:id",
  authorize(["admin", "user"]),
  questionService.getQuestionById
);

router.patch("/delete/:id", authorize("admin"), questionService.deleteQuestion);

router.post(
  "/add-new",
  authorize("admin"),
  addQuestionSchema,
  questionService.addQuestionDetails
);

module.exports = router;
