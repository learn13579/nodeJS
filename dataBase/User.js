const {Schema, model} = require('mongoose');

const {userRoles} = require('../constants');
const {passwordService} = require('../service');

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
    },
    is_active: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.virtual('fullName')
    .get(function() {
        return `${this.name} is ${this.role}`;
    });

userSchema.methods = {
    comparePassword(password) {
        return passwordService.compare(password, this.password);
    }
};

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        const hashedPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    },

    async updatePassword(userId, newPassword) {
        const hashedPassword = await passwordService.hash(newPassword);

        return this.updateOne({_id: userId}, {password: hashedPassword});
    }
};

module.exports = model('users', userSchema);
