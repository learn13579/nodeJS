const User = require('../dataBase/User');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userPassword = await User.findOne({ password });
            const userEmail = await User.findOne({ email });

            if (!userEmail || !userPassword) {
                throw new Error('login or email failed');
            }

            next();

        } catch (e) {
            res.json(e.message);
        }
    }
};
