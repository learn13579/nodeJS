const {User} = require('../dataBase');
const {userValidator: {createUserValidator, updateUserValidator}} = require('../validators');
const {ErrorsMsg, ErrorsStatus} = require('../errorsCustom');
const {ErrorHandler} = require('../errors');

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const ourUser = await User.findById(user_id);

            if (!ourUser) {
                throw new ErrorHandler(ErrorsMsg.msgNOT_ID, ErrorsStatus.status404);
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
                throw new ErrorHandler(ErrorsMsg.msgEmailExist, ErrorsStatus.status400);
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
                throw new ErrorHandler(ErrorsMsg.msgAccessDenied);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
