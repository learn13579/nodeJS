const User = require('../dataBase/User');

module.exports = {
    authorizationMiddleware: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const userEmail = await User.findOne({email});
            if (!userEmail || userEmail.password !== password) {
                throw new Error('login or email failed');
            }
            req.user = userEmail;
            next();

        } catch (e) {
            res.json(e.message);
        }
    }
};
