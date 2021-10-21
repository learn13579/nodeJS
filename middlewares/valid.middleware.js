const {ErrorHandler} = require('../errors');
const {ErrorsStatus} = require('../errorsCustom');

module.exports = {
    isValidMiddleware: (valid) => (req, res, next) => {
        try {
            const {error} = valid.validate(req.body);

            if (error) {
                throw new ErrorHandler(error.details[0].message, ErrorsStatus.status400);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
