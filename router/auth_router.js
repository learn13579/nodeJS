const router = require('express').Router();

const {authController: {authUser}} = require('../controllers');
const {authMiddleware: {isAuthMiddleware, isLoginValid}} = require('../middlewares');

router.post('/', isLoginValid, isAuthMiddleware, authUser);

module.exports = router;
