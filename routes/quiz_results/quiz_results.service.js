const mongoose = require("mongoose");

const QuizResultModel = require("./quiz_results.model");
const QuestionModel = require("../questions/questions.model");
const response = require("../../helpers/response");

exports.addResult = async (req, res) => {
  try {
    const { user_id, category_id, questions } = req.body;
    let sum = 0;
    const questionsData = await QuestionModel.find({
      category_id,
      is_deleted: false,
    });
    questions.forEach(async (que) => {
      const question = questionsData.find(
        (queData) => queData._id == que.question_id
      );
      que.question = question;
      const correctAns = que.question.options.find(
        (opt) => opt.is_correct === true
      );
      if (correctAns._id == que.answer_id) {
        sum = sum + 1;
      }
    });
    const quizResultData = await QuizResultModel.create({
      user_id,
      category_id,
      total_score: sum,
      questions,
    });
    response(res, null, quizResultData, "Thank you for playing quiz!!", 200);
  } catch (error) {
    response(res, error, null, "Something went wrong", 500);
  }
};

exports.getQuizScore = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const quizScores = await QuizResultModel.find({ user_id });
    response(res, null, quizScores, "All quiz results found successfully", 200);
  } catch (error) {
    response(res, error, null, "Something went wrong in fetching data", 500);
  }
};

exports.getResultByCategory = async (req, res) => {
  try {
    const quizResultData = await QuizResultModel.findOne({
      category_id: req.params.categoryId,
      user_id: req.user.user_id,
    });
    response(
      res,
      null,
      quizResultData,
      "Quiz Result Data found successfully",
      200
    );
  } catch (error) {
    response(res, error, null, "Something went wrong", 500);
  }
};
