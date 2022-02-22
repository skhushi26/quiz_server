const Joi = require("joi");
const validateRequest = require("../../helpers/validation");

module.exports = { addQuizCategorySchema, updateQuizCategorySchema };

function addQuizCategorySchema(req, res, next) {
  const schemaRules = {
    name: Joi.string().required(),
    description: Joi.string().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}

function updateQuizCategorySchema(req, res, next) {
  const schemaRules = {
    name: Joi.string(),
    description: Joi.string(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}
