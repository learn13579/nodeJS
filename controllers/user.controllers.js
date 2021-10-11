const User = require('../dataBase/User');
const passwordService = require('../service/password.service');

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
        try {
            const {user_id} = req.params;
            const user = await User.findById(user_id);

            res.json(user);
        } catch (e) {
            throw new Error(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashedPassword});

            res.json(newUser);
        } catch (e) {
            res.json(e);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            const deletedUser = await User.findOneAndDelete(user_id);

            res.json(`user ${deletedUser} deleted`);

        } catch (e) {
            throw new Error(e.message);
        }
    }
};
