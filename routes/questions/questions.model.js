const mongoose = require("mongoose");

const optionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  is_correct: {
    type: Boolean,
    default: false,
  },
});

const questionSchema = mongoose.Schema(
  {
    question_name: {
      type: String,
      required: true,
    },
    options: [{ type: optionSchema }],
    category_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "submitted"],
      default: "draft",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
