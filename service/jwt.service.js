const jwt = require('jsonwebtoken');

const {ErrorHandler} = require('../errors');
const {tokenTypeEnum: {ACCESS}, tokenActionEnum: {FORGOT_PASSWORD}} = require('../constants');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACTION_SECRET} = require('../configs/config');
const {ErrorsMsg: {msgInvalidToken, msgWrongTokenType}, ErrorsStatus: {status401, status500}} = require('../errorsCustom');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secret = tokenType === ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;

            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(msgInvalidToken, status401);
        }
    },

    generateActionToken: (actionTokenType) => {
        let secretWord;

        switch (actionTokenType) {
            case FORGOT_PASSWORD:
                secretWord = JWT_ACTION_SECRET;
                break;
            default:
                throw new ErrorHandler(msgWrongTokenType, status500);
        }

        return jwt.sign({}, JWT_ACTION_SECRET, {expiresIn: '24h'});
    }
};
