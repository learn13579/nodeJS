const {Constants: {AUTHORIZATION}, tokenTypeEnum: {REFRESH}} = require('../constants');
const {passwordService, jwtService} = require('../service');
const {ErrorsMsg: {msgWRONG, msgNoToken, msgInvalidToken}, ErrorsStatus: {status400, status401}} = require('../errorsCustom');
const {ErrorHandler} = require('../errors');
const {O_Auth, User} = require('../dataBase');

module.exports = {
    isAuthMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const ourUser = await User.findOne({email})
                .select('+password')
                .lean();

            if (!ourUser) {
                throw new ErrorHandler(msgWRONG, status400);
            }

            req.ourUser = ourUser;
            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginValid: async (req, res, next) => {
        try {
            const {body, ourUser} = req;

            await passwordService.compare(body.password, ourUser.password);

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordsMatched: async (req, res, next) => {
        try {

            const {password} = req.body;
            const {password: hashPassword} = req.ourUser;

            await passwordService.compare(password, hashPassword);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(msgNoToken, status401);
            }

            await jwtService.verifyToken(token);

            const tokenResponse = await O_Auth
                .findOne({access_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(msgInvalidToken, status401);
            }

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(msgNoToken, status401);
            }

            await jwtService.verifyToken(token, REFRESH);

            const tokenResponse = await O_Auth
                .findOne({refresh_token: token})
                .populate('user_id');

            if (!tokenResponse) {
                throw new ErrorHandler(msgInvalidToken, status401);
            }

            await O_Auth.remove({refresh_token: token});

            req.user = tokenResponse.user_id;
            next();
        } catch (e) {
            next(e);
        }
    }
};
