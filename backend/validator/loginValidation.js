const joi = require("joi");

function loginValidation(body) {
  const userValidateSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().min(8).max(20).required(),
  });
  return userValidateSchema.validate(body);
}

module.exports = loginValidation;
