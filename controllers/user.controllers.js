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
        const {user_id} = req.params;
        const user = await User.findById(user_id);

        res.json(user);
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
        let db = await read();

        const {user_id} = req.params;

        db = db.filter(user => user.id !== +user_id);
        await write(db);

        res.json(db);
    }
};
