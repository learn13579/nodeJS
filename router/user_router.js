const router = require('express')
    .Router();

const {userControllers: {getUsers, getUserById, createUser, updateUser, deleteAccount}} = require('../controllers');
const {

    validMiddleware: {ValidMiddleware},
    authMiddleware: {checkAccessToken},
    userMiddleware: {userIdMiddleware, userEmailMiddleware}
} = require('../middlewares');
const {userValidator, updateValidator} = require('../validators');

router.get('/', getUsers);
router.post('/', ValidMiddleware(userValidator), userEmailMiddleware, createUser);

router.get('/:user_id', userIdMiddleware, getUserById);
router.put('/:user_id', ValidMiddleware(updateValidator), checkAccessToken, userIdMiddleware, updateUser);
router.delete('/:user_id', checkAccessToken, userIdMiddleware, deleteAccount);

module.exports = router;
