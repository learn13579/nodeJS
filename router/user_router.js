const router = require('express').Router();

const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controllers');
const {createUserMiddleware, isUserValidMiddleware, userEditMiddleware} = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', isUserValidMiddleware, createUserMiddleware, createUser);

router.get('/:user_id', userEditMiddleware, getUserById);
router.put('/:userId', userEditMiddleware, updateUser);
router.delete('/:user_id', userEditMiddleware, deleteUser);

module.exports = router;
