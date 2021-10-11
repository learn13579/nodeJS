const User = require('../dataBase/User');

module.exports = {
    userEdit: async (req, res, next) => {
        try {
            const {params: {user_id}} = req;

            const ourUser = await User.findById(user_id);

            if (!ourUser) {

                throw new Error(`There is no such user`);
            }
            req.ourUser = ourUser;

            next();
        } catch (err) {
            res.json(err.message);
        }
    }
};
