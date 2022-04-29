const joi = require("joi");

function signupValidation(body) {
  const userValidateSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().min(8).max(20).required(),
    nom: joi.string().trim().required(),
    prenom: joi.string().trim().required(),
    photo: joi.string().required(),
  });
  return userValidateSchema.validate(body);
}

module.exports = signupValidation;
