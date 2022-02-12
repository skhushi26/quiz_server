const Joi = require("joi");
const validateRequest = require("../../helpers/validation");

module.exports = { userRegistrationSchema };

function userRegistrationSchema(req, res, next) {
  const schemaRules = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    mobile_no: Joi.number().required(),
  };

  validateRequest(req, next, Joi.object(schemaRules));
}
