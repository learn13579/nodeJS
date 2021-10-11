const router = require('express').Router();

const loginController = require('../controllers/authorization.controller');
const loginMiddleware = require('../middlewares/authorization.Middleware');

router.post('/', loginMiddleware.authorizationMiddleware, loginController.authorizationUser);

module.exports = router;
