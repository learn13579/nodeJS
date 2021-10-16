const Joi = require('joi');

const {Constants: {PASSWORD_REGEX, EMAIL_REGEX}} = require('../constants');
const userRoles = require('../constants');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required()
        .lowercase(),
    email: Joi
        .string()
        .regex(EMAIL_REGEX)
        .required()
        .trim()
        .min(15),
    password: Joi
        .string()
        .regex(PASSWORD_REGEX)
        .required()
        .trim()
        .min(10)
        .max(30),
    role: Joi.string()
        .allow(...Object.values(userRoles)),
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .lowercase(),
});

module.exports = {createUserValidator, updateUserValidator};
