const {User, O_Auth} = require('../dataBase');
const {userNormalizer} = require('../util/user.util');
const {jwtService} = require('../service');
const {ErrorsStatus: {status205}} = require('../errorsCustom');

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
            const {ourUser} = req;

            await O_Auth.deleteOne({user: ourUser._id});

            res.sendStatus(status205);
        } catch (e) {
            next(e);
        }
    },
};
