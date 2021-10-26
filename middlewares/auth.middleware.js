const {O_Auth, User, ActionToken} = require('../dataBase');
const {Constants: {AUTHORIZATION}, tokenTypeEnum: {REFRESH, ACCESS}} = require('../constants');
const {passwordService, jwtService} = require('../service');
const {ErrorsMsg: {msgWRONG, msgNoToken, msgInvalidToken}, ErrorsStatus: {status400, status401}} = require('../errorsCustom');
const {ErrorHandler} = require('../errors');

module.exports = {
    isAuthMiddleware: async (req, res, next) => {
        try {
            const {email} = req.body;

            const ourUser = await User.findOne({email});

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

            await jwtService.verifyToken(token, ACCESS);

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
    },

    checkActionToken: (actionTokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(msgNoToken, status401);
            }

            await jwtService.verifyToken(token, actionTokenType);

            const tokenResponseAction = await ActionToken.findOne({token});

            if (!tokenResponseAction) {
                throw new ErrorHandler(msgInvalidToken, status401);
            }

            await ActionToken.deleteOne({token});

            req.user = tokenResponseAction.user_id;
            next();
        } catch (e) {
            next(e);
        }
    }
};
