const User = require('../dataBase/User');
const userValidator = require('../validators/user.validator');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try {
            const userEmail = await User.findOne({email: req.body.email});

            if (userEmail) {
                throw new Error('Email already exist');
            }

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    userEditMiddleware: async (req, res, next) => {
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

    isUserValidMiddleware: (req, res, next) => {
        try {
            const {error, value} = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            console.log(value);
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
