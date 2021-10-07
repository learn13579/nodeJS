const router = require('express').Router();

const userController = require('../controllers/user.controllers');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.put('/', userController.updateUser);

router.get('/:user_id', userController.getUserById);

router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

module.exports = router;
