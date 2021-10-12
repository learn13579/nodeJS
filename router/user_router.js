const router = require('express').Router();

const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controllers');
const {userValidMiddleware, userIdMiddleware, updateMiddleware} = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', userIdMiddleware, userValidMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', userIdMiddleware, updateMiddleware, updateUser);
router.delete('/:user_id', userIdMiddleware, deleteUser);

module.exports = router;
