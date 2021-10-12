const User = require('../dataBase/User');

module.exports = {
    authMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userEmail = await User.findOne({email});

            if (!userEmail) {
                throw new Error('login or email failed');
            }

            req.user = userEmail;
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
