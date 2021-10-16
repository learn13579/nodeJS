const {userNormalizer} = require('../util/user.util');

module.exports = {
    authUser: (req, res, next) => {
        try {
            const {ourUser} = req;
            const userNormalized = userNormalizer(ourUser);

            res.json(userNormalized);
        } catch (e) {
            next(e);
        }
    },
};
