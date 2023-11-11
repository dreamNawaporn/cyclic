require('dotenv').config()

module.exports = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    db: process.env.DB,
    dialect:"postgres",
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
};