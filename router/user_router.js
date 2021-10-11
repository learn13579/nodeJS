const router = require('express').Router();

const userController = require('../controllers/user.controllers');
const userMiddleware = require('../middlewares/edit.user.middleware');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.get('/:user_id', userMiddleware.userEdit, userController.getUserById);
router.delete('/:userId', userMiddleware.userEdit, userController.deleteUser);

module.exports = router;
