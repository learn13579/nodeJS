const User = require('../dataBase/User');

module.exports = {
    authorizationUser: async (req, res) => {
        try {
            const loginUser = await User.findOne({email: req.body.email, password: req.body.password});

            res.json(loginUser);

        } catch (e) {
            res.json(e);
        }
    },
};
