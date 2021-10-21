const {User} = require('../dataBase');
const {ErrorHandler} = require('../errors');
const {ErrorsMsg: {msgNOT_ID, msgEmailExist, msgAccessDenied}, ErrorsStatus: {status400, status404}} = require('../errorsCustom');

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
