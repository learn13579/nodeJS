const bcrypt = require('bcrypt');

const {ErrorsMsg: {msgWRONG}, ErrorsStatus: {status400}} = require('../errorsCustom');
const {ErrorHandler} = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(msgWRONG, status400);
        }
    },
};
