const User = require('../dataBase/User');

module.exports = {
    userEdit: async (req, res, next) => {
        try {
            const {params: {user_id}} = req.body;

            const idUser = await User.findById(user_id);

            if (!idUser) {
                throw new Error(`There is no such user`);
            }
            req.body = idUser;

            next();

        } catch (err) {
            res.json(err.message);
        }
    }
};
