const express = require('express');
const mongoose = require('mongoose');

const {MONGO_URL, PORT} = require('./configs/config');
const userRouter = require('./router/user_router');

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listen ${PORT}`);
});
