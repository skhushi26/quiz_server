const mongoose = require("mongoose");

const quizCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

module.exports = mongoose.model("quiz_category", quizCategorySchema);
