const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const {tokenTypeEnum: {ACCESS}} = require('../constants');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('../configs/config');
const {ErrorsMsg, ErrorsStatus} = require('../errorsCustom');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, 'xxx', {expiresIn: '15m'});
        const refresh_token = jwt.sign({}, 'zzz', {expiresIn: '30d'});

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
            throw new ErrorHandler(ErrorsMsg.msgInvalidToken, ErrorsStatus.status401);
        }
    }
};
