const router = require('express').Router();

const userController = require('../controllers/user.controllers');
const loginController = require('../controllers/authorization.controller');
const userMiddleware = require('../middlewares/user.middleware');
const loginMiddleware = require('../middlewares/authorization.Middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:user_id', userController.getUserById);
router.post('/authorization', loginMiddleware.authorizationMiddleware, loginController.authorizationUser);

module.exports = router;
