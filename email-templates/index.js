const {emailActionsEnum: {WELCOME, ORDER_CONFIRMED, USER_BLOCKED}} = require('../constants');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!'
    },
    [ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool!'
    },
    [USER_BLOCKED]: {
        templateName: 'us-b',
        subject: 'oops'
    }
};
