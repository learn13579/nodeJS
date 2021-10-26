const router = require('express')
    .Router();

const {authController: {authUser, logoutUser, changePassword}} = require('../controllers');
const {
    validMiddleware: {isValidMiddleware},
    authMiddleware: {isAuthMiddleware, isLoginValid, isPasswordsMatched, checkRefreshToken, checkAccessToken, checkActionToken},
    userMiddleware: {checkUserRole}
} = require('../middlewares');

const {userRoles: {ADMIN, USER}} = require('../constants');
const {
    // userValidator: {createUserValidator},
    // updateValidator: {updateUserValidator},
    forgotPasswordValidator: {passwordValidator},
    emailUserValidator: {emailValidator}
} = require('../validators');

const {tokenActionEnum: {ACTION, FORGOT_PASSWORD}} = require("../constants");

router.post('/', isAuthMiddleware, isLoginValid, checkUserRole([
    ADMIN,
    USER
]),
    authUser);

router.put('/forgotPassword', isValidMiddleware(emailValidator),  );
router.put('/changePassword', isValidMiddleware(passwordValidator), checkActionToken(FORGOT_PASSWORD), changePassword);

router.post('/logout', checkAccessToken, logoutUser);

router.post('/refresh', checkRefreshToken, authUser);

module.exports = router;
