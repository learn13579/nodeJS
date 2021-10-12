module.exports = {
    userNormalizer: (userToNormalizer = {}) => {
        const fieldsToRemove = [
            'password',
            '__v'
        ];

        fieldsToRemove.forEach((field) => {
            delete userToNormalizer[field];
        });

        return userToNormalizer;
    }
};
