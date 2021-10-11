const router = require('express').Router();

const userController = require('../controllers/user.controllers');
const userMiddleware = require('../middlewares/edit.user.middleware');
const validUserMiddleware = require('../middlewares/valid.user.middleware');

router.get('/', userController.getUsers);
router.post('/', validUserMiddleware.isUserBodyValid, userController.createUser);

router.get('/:user_id', userController.getUserById);
router.delete('/:user_id', userMiddleware.userEdit, userController.deleteUser);

module.exports = router;
