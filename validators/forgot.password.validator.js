const Joi = require('joi');

const {Constants: {PASSWORD_REGEX}} = require('../constants');

const passwordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEX)
        .required()
        .trim()
        .min(10)
        .max(30),
});

module.exports = {passwordValidator};
