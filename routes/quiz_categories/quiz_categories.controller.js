const express = require("express");
const authorize = require("../../helpers/authorize");

const quizCategoryService = require("./quiz_categories.service");
const {
  addQuizCategorySchema,
  updateQuizCategorySchema,
} = require("./quiz_categories.validation");

const router = express.Router();

router.post(
  "/add",
  authorize("admin"),
  addQuizCategorySchema,
  quizCategoryService.addQuizCategory
);

router.patch(
  "/update/:id",
  authorize("admin"),
  updateQuizCategorySchema,
  quizCategoryService.updateQuizCategory
);

router.patch(
  "/delete/:id",
  authorize("admin"),
  quizCategoryService.deleteQuizCategory
);

router.get(
  "/get-all",
  authorize(["admin", "user"]),
  quizCategoryService.getAllQuizCategories
);

router.patch(
  "/submit/:id",
  authorize("admin"),
  quizCategoryService.submitCategory
);

router.get("/get-one/:id", authorize("admin"), quizCategoryService.getById);

router.get(
  "/get-question-by-category/:id",
  authorize(["admin", "user"]),
  quizCategoryService.getQuestionByCategory
);

router.get(
  "/get-submitted",
  authorize("user"),
  quizCategoryService.getSubmittedQuizCategory
);

module.exports = router;
