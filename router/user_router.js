const router = require('express')
    .Router();

const {userControllers: {getUsers, getUserById, createUser, updateUser, deleteAccount}} = require('../controllers');
const {
    validMiddleware,
    authMiddleware: {checkAccessToken},
    userMiddleware: {userIdMiddleware, userEmailMiddleware, checkUserRole}
} = require('../middlewares');
const {userRoles} = require('../constants');
const {userValidator:{createUserValidator}, updateValidator:{updateUserValidator}} = require('../validators');

router.get('/', getUsers);
router.post('/', validMiddleware.isValidMiddleware(createUserValidator), userEmailMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', validMiddleware.isValidMiddleware(updateUserValidator), checkAccessToken, userIdMiddleware, updateUser);
router.delete('/:user_id', checkAccessToken, checkUserRole([userRoles.ADMIN]), deleteAccount);

module.exports = router;
