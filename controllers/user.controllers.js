const User = require('../dataBase/user');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        const {user_id} = req.params;
        const user = await User.findById(user_id);

        res.json(user);
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    authorizationUser: async (req, res) => {
        try {
            const login = await User.findOne({email: req.body.email, password: req.body.password});

            if (!login) {
                throw new Error('Error, user does not exist');
            }

            res.json('Congratulations, you have successfully logged in');

        } catch (e) {
            res.json(e);
        }
    },
};
