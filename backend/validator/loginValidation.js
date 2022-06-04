const joi = require("joi");

function userValidation(body) {
  const loginValidateSchema = joi
    .object({
      email: joi.string().email().trim().required().messages({
        "string.base": `Le format de l'email est invalide`,
        "string.email": `le format de l'email n'est pas correct`,
        "string.empty": `L'email est obligatoire`,
        "any.required": `L'e'mail est obligatoire`,
      }),
      password: joi.string().min(8).max(20).required().messages({
        "string.base": `Le format du mot de passe est invalide`,
        "string.empty": `Le mot de passe est obligatoire`,
        "string.min": `Le mot de passe doit avoir {#limit} caractères minimum`,
        "string.max": `Le mot de passe doit avoir {#limit} caractères maximum`,
        "any.required": `Le mot de passe est obligatoire`,
      }),
    })
    .options({ abortEarly: false });
  return loginValidateSchema.validate(body);
}

module.exports = userValidation;
