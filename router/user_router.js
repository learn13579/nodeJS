const router = require('express')
    .Router();

const {userRoles} = require('../constants');
const {userControllers: {getUsers, getUserById, createUser, updateUser, deleteAccount}} = require('../controllers');
const {
    validMiddleware: {isValidMiddleware},
    authMiddleware: {checkAccessToken},
    userMiddleware: {userIdMiddleware, userEmailMiddleware, checkUserRole}
} = require('../middlewares');
const {
    userValidator: {createUserValidator},
    updateValidator: {updateUserValidator},
    forgotPasswordValidator: {passwordValidator}
} = require('../validators');

router.get('/', getUsers);
router.post('/', isValidMiddleware(createUserValidator), userEmailMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', isValidMiddleware(updateUserValidator), checkAccessToken, userIdMiddleware, updateUser);
router.delete('/:user_id',
    // checkAccessToken, checkUserRole([userRoles.ADMIN]),
    deleteAccount);

module.exports = router;
