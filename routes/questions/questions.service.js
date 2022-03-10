const mongoose = require("mongoose");

const QuestionModel = require("./questions.model");
const response = require("../../helpers/response");

exports.getQuestionById = async (req, res) => {
  try {
    const _id = req.params.id;
    const questionDetail = await QuestionModel.findOne({ _id });
    response(
      res,
      null,
      questionDetail,
      "Question detail found successfully",
      200
    );
  } catch (error) {
    response(res, error, null, "Something went wrong in fetching detail", 500);
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteQuestion = await QuestionModel.findOneAndUpdate(
      { _id },
      { is_deleted: true }
    );
    response(res, null, deleteQuestion, "Question deleted successfully", 200);
  } catch (error) {
    response(res, error, null, "Something went wrong", 500);
  }
};

exports.addQuestionDetails = async (req, res) => {
  try {
    const { questions, is_submitted } = req.body;
    let questionData;
    const status = is_submitted ? "submitted" : "draft";
    questions.forEach(async (question) => {
      if (question.hasOwnProperty("_id")) {
        questionData = await QuestionModel.findOneAndUpdate(
          { _id: question._id },
          {
            question_name: question.question_name,
            options: question.options,
            category_id: question.category_id,
            status: status,
          }
        );
      } else {
        questionData = await QuestionModel.create({
          question_name: question.question_name,
          options: question.options,
          category_id: question.category_id,
          status: status,
        });
      }
    });
    response(res, null, true, "Questions added successfully", 200);
  } catch (error) {
    response(res, error, null, "Something went wrong!!", 500);
  }
};
