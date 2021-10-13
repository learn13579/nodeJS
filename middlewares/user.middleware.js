const User = require('../dataBase/User');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const ourUser = await User.findById(user_id);

            if (!ourUser) {
                throw new Error('there is no such user');
            }

            req.ourUser = ourUser;
            next();
        } catch (e) {
            res.json(e.message);
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
            res.json(e.message);
        }
    },

    updateMiddleware: (req, res, next) => {
        try {
            const {body} = req.body;
            const {error} = updateUserValidator.validate({body});

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
