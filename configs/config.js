module.exports = {
    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/MyBase',
    PORT: process.env.PORT || 5000,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'zzz',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'xxx',
    JWT_ACTION_SECRET: process.env.JWT_ACTION_SECRET || 'aaa',

    MY_EMAIL: process.env.MY_EMAIL || 'g@gmail.com',
    MY_EMAIL_PASSWORD: process.env.MY_EMAIL_PASSWORD || '123'
};
