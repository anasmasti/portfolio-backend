const Joi = require('joi');

const contactValidationSchema = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    phone: Joi.string(),

    email: Joi.string()
        .email({ minDomainSegments: 2, multiple: false, tlds: { allow: ['com', 'net', 'ma', 'fr', 'org'] } })
        .lowercase(),

    message: Joi.string()
        .min(10)
        .max(1200)
        .required(),
})

module.exports = { contactValidationSchema }