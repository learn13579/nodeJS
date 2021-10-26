const {ErrorHandler} = require('../errors');
const {ErrorsStatus: {status400}} = require('../errorsCustom');

module.exports = {
    isValidMiddleware: (valid) => (req, res, next) => {
        try {
            const {error} = valid.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, status400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
