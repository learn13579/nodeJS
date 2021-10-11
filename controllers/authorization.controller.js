module.exports = {
    authorizationUser: (req, res) => {
        try {
            const loginUser = req.user;

            res.json(loginUser);

        } catch (e) {
            throw new Error(e.message);
        }
    },
};
