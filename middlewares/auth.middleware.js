const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const {authValidator} = require('../validators/auth.validator');
const {WRONG, ErrorHandler} = require("../errors");

module.exports = {
    isAuthMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const ourUser = await User.findOne({email}).select('+password');

            if (!ourUser) {
                throw new ErrorHandler(WRONG);
                // throw new Error('Wrong email or password');
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
                throw new ErrorHandler(WRONG);
                // throw new Error('Wrong email or password');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
