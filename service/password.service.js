const bcrypt = require('bcrypt');

const {ErrorsMsg, ErrorsStatus} = require('../errorsCustom');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(ErrorsMsg.msgWRONG, ErrorsStatus.status400);
        }
    },
};
