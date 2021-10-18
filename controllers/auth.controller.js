const {User, O_Auth} = require('../dataBase');
const {userNormalizer} = require('../util/user.util');
const {jwtService} = require('../service');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const {ourUser} = req;

            const tokenPair = jwtService.generateTokenPair();

            const userNormalized = userNormalizer(ourUser);

            await O_Auth.create({
                ...tokenPair,
                user_id: userNormalized._id
            });

            res.json({
                user: userNormalized,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
};
