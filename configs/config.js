module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    HOST_URL: process.env.HOST_URL || 'http://localhost:5000',
    PORT: process.env.PORT || 5000,

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/MyBase',

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'aaa',
    JWT_FORGOT_PASSWORD_SECRET: process.env.JWT_FORGOT_PASSWORD_SECRET || 'yyy',

    MY_EMAIL: process.env.MY_EMAIL || 'g@gmail.com',
    MY_EMAIL_PASSWORD: process.env.MY_EMAIL_PASSWORD || '123'
};
