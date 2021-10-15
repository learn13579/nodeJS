const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const { authValidator } = require('../validators');
const { ErrorsMsg, ErrorsStatus } = require("../errorsCustom");
const ErrorHandler = require("../errors/ErrorHandler");

module.exports = {
    isAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const ourUser = await User.findOne({email}).select('+password');

            if (!ourUser) {
                throw new ErrorHandler(ErrorsMsg.msgWRONG, ErrorsStatus.statusWRONG);
            }

            await passwordService.compare(password, ourUser.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginValid: (req, res, next) => {
        try {
            const {error} = authValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(ErrorsMsg.msgWRONG, ErrorsStatus.statusWRONG);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
