const Joi = require("joi");
const validateRequest = require("../../helpers/validation");

module.exports = { addQuestionSchema, submitQuestionSchema };

function addQuestionSchema(req, res, next) {
  const schemaRules = {
    questions: Joi.array().required(),
    is_submitted: Joi.boolean().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

function submitQuestionSchema(req, res, next) {
  const schemaRules = {
    question_ids: Joi.array().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}
