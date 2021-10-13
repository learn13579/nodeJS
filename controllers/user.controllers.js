const User = require('../dataBase/User');
const passwordService = require('../service/password.service');
const userUtil = require('../util/user.util');

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
            const user = await User
                .findById(user_id)
                .lean();

            const normalizedUser = userUtil.userNormalizer(user);

            res.json(normalizedUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const hashedPassword = await passwordService.hash(req.body.password);
            const newUser = await User.create({...req.body, password: hashedPassword});

            const normalizedUser = userUtil.userNormalizer(newUser.toObject());

            res.json(normalizedUser);
        } catch (e) {
            res.json(e);
        }
    },

    updateUser: async (req, res) => {
        try {
            const {body, params: {user_id}} = req;
            const newUser = await User.findByIdAndUpdate(user_id, body, {new: true, runValidators: true});

            res.json(newUser);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {user_id} = req.params;
            await User.deleteOne({_id: user_id});

            res.json(`User ${user_id} deleted`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
