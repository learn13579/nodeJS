const router = require('express').Router();

const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controllers');
const {userValidMiddleware, userIdMiddleware, userEmailMiddleware, updateMiddleware} = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', userValidMiddleware, userEmailMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', updateMiddleware, userIdMiddleware, updateUser);
router.delete('/:user_id', userIdMiddleware, deleteUser);

module.exports = router;
