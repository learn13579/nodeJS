const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/MyBase');

const userRouter = require('./router/user_router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('App listen 5000');
});
