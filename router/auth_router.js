const router = require('express').Router();

const {authUser} = require('../controllers');
const {isAuthMiddleware, isLoginValid} = require('../middlewares');

router.post('/', isLoginValid, isAuthMiddleware, authUser);

module.exports = router;
