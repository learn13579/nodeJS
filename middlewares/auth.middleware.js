const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const {authValidator} = require('../validators/auth.validator');

module.exports = {
    authMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const ourUser = await User.findOne({email}).select('+password');

            if (!ourUser) {
                throw new Error('Wrong email or password');
            }

            await passwordService.compare(password, ourUser.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    isLoginValid: (req, res, next) => {
        try {
            const {error} = authValidator.validate(req.body);

            if (error) {
                throw new Error('Wrong email or password');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
