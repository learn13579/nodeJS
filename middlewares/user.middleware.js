const User = require('../dataBase/User');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');
const {ErrorsMsg: {msgNOT_ID, msgEmailExist, msgAccessDenied}, ErrorsStatus: {status400, status404}} = require('../errorsCustom');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const ourUser = await User.findById(user_id);

            if (!ourUser) {
                throw new ErrorHandler(msgNOT_ID, status404);
            }

            req.ourUser = ourUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    userEmailMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const emailUser = await User.findOne({email});

            if (emailUser) {
                throw new ErrorHandler(msgEmailExist, status400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    userValidMiddleware: (req, res, next) => {
        try {
            const {error, value} = createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, status400);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    updateMiddleware: (req, res, next) => {
        try {
            const {body} = req;
            const {error} = updateUserValidator.validate(body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, status400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const {role} = req.ourUser;

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(msgAccessDenied);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
