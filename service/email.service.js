const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {MY_EMAIL, MY_EMAIL_PASSWORD} = require('../configs/config');
const allTemplates = require('../email-templates');
const {ErrorsMsg: {msgWrongTemplateName}} = require('../errorsCustom');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MY_EMAIL,
        pass: MY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new Error(msgWrongTemplateName);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply, Maryana',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
