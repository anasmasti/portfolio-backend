const Joi = require("joi");

const contactValidationSchema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "First name is a required field",
    "string.min": "First name should have a minimum length of 3",
    "string.max": "First name should have a maximum length of 30",
  }),
  last_name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "Last name is a required field",
    "string.min": "Last name should have a minimum length of 3",
    "string.max": "Last name should have a maximum length of 30",
  }),
  phone: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      multiple: false,
      tlds: { allow: ["com", "net", "ma", "fr", "org"] },
    })
    .lowercase()
    .messages({
      "string.email": "Invalid email address",
    }),
  message: Joi.string().min(10).max(1200).required().messages({
    "any.required": "Message is a required field",
    "string.min": "Message should have a minimum length of 10",
    "string.max": "Message should have a maximum length of 1200",
  }),
});

module.exports = { contactValidationSchema };
