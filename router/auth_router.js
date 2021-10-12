const router = require('express').Router();

const {authUser} = require('../controllers/auth.controller');
const {authMiddleware} = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, authUser);

module.exports = router;
