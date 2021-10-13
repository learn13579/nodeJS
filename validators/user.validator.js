const Joi = require('joi');

const {EMAIL_REGEX, PASSWORD_REGEX} = require('../configs/constants');
const userRoles = require('../configs/user-roles');

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
        .required()
        .lowercase(),
});

module.exports = {createUserValidator, updateUserValidator};
