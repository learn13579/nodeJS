const {userNormalizer} = require('../util/user.util');

module.exports = {
    authUser: (req, res) => {
        try {
            const { user } = req;
            const userNormalized = userNormalizer(user);

            res.json(userNormalized);
        } catch (e) {
            res.json(e);
        }
    },
};
