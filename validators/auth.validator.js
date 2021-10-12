const Joi = require('joi');

const {PASSWORD_REGEX, EMAIL_REGEX} = require('../configs/constants');

const authValidator = Joi.object({
    login: Joi
        .string()
        .regex(EMAIL_REGEX)
        .required()
        .alphanum()
        .min(15),
    password: Joi
        .string()
        .regex(PASSWORD_REGEX)
        .min(10)
        .max(30)
        .required()
        .trim(),
});

module.exports = {authValidator};
