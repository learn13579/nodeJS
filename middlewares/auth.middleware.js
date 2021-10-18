const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const {authValidator} = require('../validators');
const {ErrorsMsg, ErrorsStatus} = require("../errorsCustom");
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    isAuthMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const ourUser = await User.findOne({email}).select('+password').lean();

            if (!ourUser) {
                throw new ErrorHandler(ErrorsMsg.msgWRONG, ErrorsStatus.status400);
            }

            req.ourUser = ourUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginValid: async (req, res, next) => {
        try {
            const {body, ourUser} = req;

            await passwordService.compare(body.password, ourUser.password);

            next();
        } catch (e) {
            next(e);
        }
    },
};
