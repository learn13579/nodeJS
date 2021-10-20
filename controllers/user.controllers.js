const {User} = require('../dataBase');
const {passwordService} = require('../service');
const userUtil = require('../util/user.util');
const {ErrorsStatus: {status201, status204}} = require('../errorsCustom');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {ourUser} = req;

            res.json(ourUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {body, body: {password}} = req;

            const hashedPassword = await passwordService.hash(password);
            const newUser = await User.create({...body, password: hashedPassword});

            const normalizedUser = userUtil.userNormalizer(newUser.toObject());

            res
                .json(normalizedUser)
                .sendStatus(status201);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {body, params: {user_id}} = req;
            const newUser = await User.findByIdAndUpdate(user_id, body, {new: true, runValidators: true});

            res.json(newUser)
                .sendStatus(status201);
        } catch (e) {
            next(e);
        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            await User.deleteOne({_id: user_id});

            res.sendStatus(status204);
        } catch (e) {
            next(e);
        }
    }
};
