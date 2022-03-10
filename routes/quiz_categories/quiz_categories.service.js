const mongoose = require("mongoose");

const quizCategoryModel = require("./quiz_categories.model");
const response = require("../../helpers/response");
const questionsModel = require("../questions/questions.model");
const QuizResultModel = require("../quiz_results/quiz_results.model");

exports.addQuizCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const isCategoryExists = await quizCategoryModel.findOne({
      name: name,
      is_deleted: false,
    });
    if (!isCategoryExists) {
      const quizCategoryData = await quizCategoryModel.create({
        name,
        description,
      });
      response(
        res,
        null,
        quizCategoryData,
        "Quiz category added successfully",
        200
      );
    } else {
      response(res, null, null, "This category already exists", 400);
    }
  } catch (error) {
    response(res, error, null, "Oops!!Something went wrong", 500);
  }
};

exports.updateQuizCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const isQuizCategoryExists = await quizCategoryModel.findOne({
      _id: req.params.id,
    });
    if (isQuizCategoryExists) {
      const updateQuizCategoryData = await quizCategoryModel.findOneAndUpdate(
        { _id: req.params.id },
        { name, description }
      );
      response(
        res,
        null,
        updateQuizCategoryData,
        "Quiz category updated successfully",
        200
      );
    } else {
      response(res, null, null, "This category doesn't exists", 400);
    }
  } catch (error) {
    response(res, error, null, "Something went wrong in updating data", 500);
  }
};

exports.deleteQuizCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const isQuizCategoryExists = await quizCategoryModel.findOne({
      _id: req.params.id,
    });
    if (isQuizCategoryExists) {
      const deleteQuizCategory = await quizCategoryModel.findOneAndUpdate(
        { _id },
        { is_deleted: true }
      );
      const deleteQuestions = await questionsModel.updateMany(
        {
          category_id: isQuizCategoryExists._id,
        },
        { is_deleted: true }
      );
      response(
        res,
        null,
        deleteQuizCategory,
        "Quiz Category deleted successfully",
        200
      );
    } else {
      response(res, null, null, "This category doesn't exists", 400);
    }
  } catch (error) {
    response(res, error, null, "Error in deleting category", 500);
  }
};

exports.getAllQuizCategories = async (req, res) => {
  try {
    const allCategories = await quizCategoryModel.find({ is_deleted: false });
    response(
      res,
      null,
      allCategories,
      "All quiz categories found successfully",
      200
    );
  } catch (error) {
    response(res, error, null, "Something went wrong", 500);
  }
};

exports.submitCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const isCategoryExists = await quizCategoryModel.findOne({ _id });
    if (isCategoryExists) {
      const submitCategoryData = await quizCategoryModel.findOneAndUpdate(
        { _id },
        { status: "submitted" }
      );
      response(
        res,
        null,
        submitCategoryData,
        "Category submitted successfully",
        200
      );
    } else {
      response(res, null, null, "This category doesn't exists", 400);
    }
  } catch (error) {
    response(res, error, null, "Something went wrong!!", 500);
  }
};

exports.getById = async (req, res) => {
  try {
    const categoryData = await quizCategoryModel.findById({
      _id: req.params.id,
    });
    response(
      res,
      null,
      categoryData,
      "Category Details found successfully",
      200
    );
  } catch (error) {
    response(res, error, null, "Something went wrong!!", 500);
  }
};

exports.getQuestionByCategory = async (req, res) => {
  try {
    const quizResultData = await QuizResultModel.findOne({
      user_id: mongoose.Types.ObjectId(req.user.user_id),
      category_id: req.params.id,
    });
    const data = await quizCategoryModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "category_id",
          as: "questions",
        },
      },
    ]);

    data[0].questions = data[0].questions.filter(
      (question) => question.is_deleted === false
    );
    data[0].is_quiz_given = true;
    if (!quizResultData && req.user.role === "user") {
      data[0].questions.map((que) => {
        que.options.map((opt) => {
          delete opt.is_correct;
        });
      });
      data[0].is_quiz_given = false;
    }

    response(
      res,
      null,
      data,
      "Quiz data with questions found successfully",
      200
    );
  } catch (error) {
    response(res, error, null, "Something went wrong!!", 500);
  }
};

exports.getSubmittedQuizCategory = async (req, res) => {
  try {
    const resData = await quizCategoryModel.find({
      status: "submitted",
    });
    const submittedQuizCategoryData = JSON.parse(JSON.stringify(resData));
    for (let submitCategory of submittedQuizCategoryData) {
      const quizResultData = await QuizResultModel.findOne({
        category_id: submitCategory._id,
        user_id: req.user.user_id,
      });

      if (quizResultData != null) {
        submitCategory["is_quiz_given"] = true;
        submitCategory["total_score"] = quizResultData.total_score;
      } else {
        submitCategory["is_quiz_given"] = false;
        submitCategory["total_score"] = 0;
      }
    }

    response(
      res,
      null,
      submittedQuizCategoryData,
      "Submitted quiz categories found successfully",
      200
    );
  } catch (error) {
    response(res, error, null, "Something went wrong!!", 500);
  }
};

const bindScoreWithQuize = () => {
  return new Promise(async (resolve, reject) => {});
};
