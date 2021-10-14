const User = require('../dataBase/User');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');
const {WRONG, NOT_ID, ErrorHandler} = require("../errors");

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const ourUser = await User.findById(user_id);

            if (!ourUser) {
                throw new ErrorHandler(NOT_ID);
                // throw new Error('there is no such user');
            }

            req.ourUser = ourUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    userEmailMiddleware: async (req, res, next) => {
        try {
            const {email} = req.params;

            const ourUser = await User.find(email);

            if (ourUser) {
                throw new ErrorHandler(WRONG);
                // throw new Error('such a user already exists');
            }

            req.ourUser = ourUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    userValidMiddleware: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    updateMiddleware: (req, res, next) => {
        try {
            const {body} = req.body;
            const {error} = updateUserValidator.validate(body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
