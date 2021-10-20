const {Schema, model} = require('mongoose');

const {tokenActionEnum} = require('../constants');

const actionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(tokenActionEnum)
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },

}, {timestamps: true});

module.exports = model('action', actionSchema);
