const Joi = require('joi');

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .lowercase(),
});

module.exports = {updateUserValidator};
