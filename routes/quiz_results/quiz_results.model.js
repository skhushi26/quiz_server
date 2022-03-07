const mongoose = require("mongoose");

const questionsSchema = mongoose.Schema({
  question_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  answer_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const questionResultSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    total_score: {
      type: Number,
      default: 0,
    },
    questions: [{ type: questionsSchema }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("question_result", questionResultSchema);
