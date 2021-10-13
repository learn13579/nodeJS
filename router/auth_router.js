const router = require('express').Router();

const {authUser} = require('../controllers/auth.controller');
const {authMiddleware, isLoginValid} = require('../middlewares/auth.middleware');

router.post('/', isLoginValid, authMiddleware, authUser);

module.exports = router;
