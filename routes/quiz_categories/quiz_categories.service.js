const quizCategoryModel = require("./quiz_categories.model");
const response = require("../../helpers/response");

exports.addQuizCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const isCategoryExists = await quizCategoryModel.findOne({ name: name });
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
