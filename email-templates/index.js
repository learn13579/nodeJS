const {emailActionsEnum: {WELCOME, DELETED}} = require('../constants');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!!'
    },
    [DELETED]: {
        templateName: 'delete account',
        subject: 'oops...'
    }
};
