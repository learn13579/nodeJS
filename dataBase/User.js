const { Schema, model } = require('mongoose');

const { userRoles } = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 15
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        select: true,
        minlength: 7,
        maxlength: 35
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength: 7
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    }
}, {timestamps: true});

module.exports = model('users', userSchema);
