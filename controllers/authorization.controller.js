module.exports = {
    authorizationUser: (req, res) => {
        try {
            const loginUser = req.user;

            res.json(loginUser);

        } catch (e) {
            res.json(e);
        }
    },
};
