const router = require('express').Router();

const userController = require('../controllers/user.controllers');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);

router.get('/:user_id', userController.getUserById);

router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.post('/authorization', userMiddleware.authorizationUserMiddleware, userController.authorizationUser);

module.exports = router;
