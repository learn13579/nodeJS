const bcrypt = require('bcrypt');
const {WRONG, ErrorHandler} = require("../errors");

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(WRONG);
            // throw new Error('Wrong email or password');
        }
    },
};
