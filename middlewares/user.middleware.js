const User = require('../dataBase/User');
const {createUserValidator, updateUserValidator} = require('../validators/user.validator');

module.exports = {
    userIdMiddleware: async (req, res, next) => {
        try {
            const {user_id} = req.params;

            const ourUser = await User.findById(user_id);

            if (!ourUser) {
                throw new Error(`There is no such user`);
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

            console.log(value);
            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    updateMiddleware: (req, res, next) => {
        try {
            const {email, password} = req.body;
            const {error, value} = updateUserValidator.validate({password});

            if (error) {
                throw new Error(error.details[0].message);
            }

            if (email) {
                throw new Error('You can change your email');
            }

            req.body = value;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },
};
