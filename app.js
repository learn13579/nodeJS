const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const {NODE_ENV, ALLOWED_ORIGIN, MONGO_CONNECT_URL, PORT} = require('./configs/config');
const {authRouter, userRouter} = require('./router');
const {ErrorsStatus: {status500}, ErrorsMsg: {msgCorsIsNotAllowed}} = require('./errorsCustom');
const {ErrorHandler} = require('./errors');

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(cors({origin: _configureCors}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || status500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});

function _configureCors(origin, callback) {
    if (NODE_ENV === 'dev') {
        return callback(null, true);
    }

    const whiteList = ALLOWED_ORIGIN.split(';');

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(msgCorsIsNotAllowed), false);
    }

    return callback(null, true);
}
