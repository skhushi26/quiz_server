const Joi = require("joi");
const validateRequest = require("../../helpers/validation");

module.exports = { addQuizResultSchema };

function addQuizResultSchema(req, res, next) {
  const schemaRules = {
    user_id: Joi.string().required(),
    category_id: Joi.string().required(),
    questions: Joi.array().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}
