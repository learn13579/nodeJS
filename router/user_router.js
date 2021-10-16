const router = require('express').Router();

const {userControllers: {getUsers, getUserById, createUser, updateUser, deleteUser}} = require('../controllers');
const {
    userMiddleware: {
        userValidMiddleware,
        userIdMiddleware,
        userEmailMiddleware,
        updateMiddleware
    }
} = require('../middlewares');

router.get('/', getUsers);
router.post('/', userValidMiddleware, userEmailMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', updateMiddleware, userIdMiddleware, updateUser);
router.delete('/:user_id', userIdMiddleware, deleteUser);

module.exports = router;
