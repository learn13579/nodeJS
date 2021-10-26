const {User, O_Auth, ActionToken} = require('../dataBase');
const {UserNormalizer: {userNormalizer}} = require('../util');
const {jwtService, emailService} = require('../service');
const {ErrorHandler} = require('../errors');
const {
    ErrorsStatus: {status201, status205, status404},
    ErrorsMsg: {msgUserNotFound, msgGood, msgOK}
} = require('../errorsCustom');
const {Constants: {AUTHORIZATION}, emailActionsEnum, tokenActionEnum} = require('../constants');
const {HOST_URL} = require('../configs/config');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const {ourUser} = req;

            await ourUser.comparePassword(req.body.password);

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

    refreshToken: async (req, res, next) => {
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

    sendMailForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const ourUser = await User.findOne({email});

            if (!ourUser) {
                throw new ErrorHandler(msgUserNotFound, status404);
            }

            const actionToken = jwtService.generateActionToken(tokenActionEnum.FORGOT_PASSWORD);

            await ActionToken.create({
                token: actionToken,
                token_type: tokenActionEnum.FORGOT_PASSWORD,
                user_id: ourUser._id
            });

            await emailService.sendMail(
                email,
                emailActionsEnum.FORGOT_PASSWORD,
                {forgotPasswordUrl: `${HOST_URL}/auth/passwordForgot/${actionToken}`});

            res.json(msgOK);
        } catch (e) {
            next(e);
        }
    },

    setNewPasswordAfterForgot: (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);

            res.json(msgGood);
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const {newPassword, ourUser: {_id, name, email}} = req.body;

            await O_Auth.deleteMany({user: _id});

            await User.updatePassword(_id, newPassword);

            await emailService.sendMail(
                email, emailActionsEnum.CHANGE_PASSWORD, {userName: name}
            );

            res.sendStatus(status201);
        } catch (e) {
            next(e);
        }
    }
};
