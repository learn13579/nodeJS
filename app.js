const express = require('express');
const mongoose = require('mongoose');

const {MONGO_URL, PORT} = require('./configs/config');
const userRouter = require('./router/user_router');
const userRouterAuth = require('./router/auth_router');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.jsson());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/auth', userRouterAuth);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${PORT}`);
});
