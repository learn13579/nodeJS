const express = require('express');
const mongoose = require('mongoose');

const {MONGO_URL, PORT} = require('./configs/config');
const {authRouter, userRouter} = require('./router');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            msg: err.message
        });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${PORT}`);
});
