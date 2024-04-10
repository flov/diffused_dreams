import Joi from "joi";

export const passwordValidator = Joi.string()
  .required()
  .min(8)
  .max(64)
  .pattern(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)
  .messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of 8",
    "string.max": "Password should have a maximum length of 64",
    "string.pattern.base":
      "Password should contain at least one number and at least one letter",
    "any.required": "Password is a required field",
  });
