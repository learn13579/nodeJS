const User = require('../dataBase/user');

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

    authorizationUserMiddleware: async (req, res, next) => {
        try {
            const userName = await User.findOne({name: req.body.name});
            const userEmail = await User.findOne({email: req.body.email});

            if (!userEmail || !userName) {
                throw new Error('login or email failed');
            }

            next();

        } catch (e) {
            res.json(e.message);
        }
    }
};
