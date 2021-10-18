const router = require('express')
    .Router();

const {authController: {authUser, logoutUser}} = require('../controllers');
const {
    authMiddleware: {isAuthMiddleware, isLoginValid, isPasswordsMatched, checkRefreshToken},
    userMiddleware: {checkUserRole}
} = require('../middlewares');

const {userRoles: {ADMIN, USER}} = require('../constants');

router.post('/', isAuthMiddleware, isLoginValid, checkUserRole([
    ADMIN,
    USER
]), isPasswordsMatched, authUser);

router.post('/logout', logoutUser);

router.post('/refresh', checkRefreshToken, authUser);

module.exports = router;
