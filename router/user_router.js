const router = require('express')
    .Router();

const {userControllers: {getUsers, getUserById, createUser, updateUser, deleteAccount}} = require('../controllers');
const {
    validMiddleware: {isValidMiddleware},
    authMiddleware: {checkAccessToken},
    userMiddleware: {userIdMiddleware, userEmailMiddleware}
} = require('../middlewares');
const {userValidator: {createUserValidator}, updateValidator: {updateUserValidator}} = require('../validators');

router.get('/', getUsers);
router.post('/', isValidMiddleware(createUserValidator), userEmailMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', isValidMiddleware(updateUserValidator), checkAccessToken, userIdMiddleware, updateUser);
router.delete('/:user_id', checkAccessToken, userIdMiddleware, deleteAccount);

module.exports = router;
