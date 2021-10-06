const express = require('express');
const path = require('path');

const userRouter = require('./router/user_router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});
