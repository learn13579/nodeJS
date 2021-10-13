const router = require('express').Router();

const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controllers');
const {userValidMiddleware, userIdMiddleware, updateMiddleware} = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', userValidMiddleware, userIdMiddleware, createUser);

router.get('/:user_id', userValidMiddleware, userIdMiddleware, getUserById);
router.put('/:user_id', userValidMiddleware, userIdMiddleware, updateMiddleware, updateUser);
router.delete('/:user_id', userIdMiddleware, deleteUser);

module.exports = router;
