const {User, Action, O_Auth} = require('../dataBase');
const {passwordService, emailService, jwtService} = require('../service');
const userUtil = require('../util/user.util');
const {emailActionsEnum: {WELCOME, DELETED}} = require('../constants');
const {tokenActionEnum} = require('../constants');
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

            const token = jwtService.createActionToken();

            await Action.create({token, type: tokenActionEnum, user_id: normalizedUser._id});
            await emailService.sendMail(req.body.email, WELCOME, {userName: req.body.name, token});

            res
                .json(newUser)
                .sendStatus(status201);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {body, params: {user_id}} = req;
            const newUser = await User.findByIdAndUpdate(user_id, body, {new: true, runValidators: true});

            res
                .json(newUser)
                .sendStatus(status201);
        } catch (e) {
            next(e);
        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {name, email} = req.body;

            await User.deleteOne({_id: user_id});
            O_Auth.deleteOne({_id: user_id});

            await emailService.sendMail(email, DELETED, {userName: name});

            res.sendStatus(status204);
        } catch (e) {
            next(e);
        }
    }
};
