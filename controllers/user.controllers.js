const {read, write} = require('../servises/user_servise');

module.exports = {
    getUsers: async (req, res) => {
        const db = await read();

        res.json(db);
    },

    getUserById: async (req, res) => {
        const db = await read();
        const {user_id} = req.params;
        const user = db[user_id - 1];

        res.json({user});
    },

    createUser: async (req, res) => {
        const db = await read();

        db.push({...req.body, id: db.length + 1});
        await write(db);

        res.json(db);
    },

    deleteUser: async (req, res) => {
        let db = await read();

        const {user_id} = req.params;

        db = db.filter(user => user.id !== +user_id);
        await write(db);

        res.json(db);
    }
}
