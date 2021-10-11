const User = require('../dataBase/User');

module.exports = {
    authorizationUser: async (req, res) => {
        try {
            const loginUser = await User.findOne({email});

            res.json(loginUser);

        } catch (e) {
            res.json(e);
        }
    },
};
