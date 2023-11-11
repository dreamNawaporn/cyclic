
const config =require ("../config/auth.config");
const {v4:uuidv4} = require("uuid")

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken",{
        token:{
            type:Sequelize.STRING,
        },
        expiryDate:{
            type:Sequelize.DATE
        }
    });
    RefreshToken.createToken = async function (user) {
        let expiryDate = new Date();
        expiryDate.setSeconds(expiryDate.getSeconds()+config.jwtRefreshExpiration);
        let _token = uuidv4();
        let refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expireAt,
        });
        return refreshToken.token
    }
    RefreshToken.veryExpiration = (token) => {
        //true: expired, false: not expired
        return token.expiryDate.getTime() < new Date().getTime();
        //ถ้าเวลาtokenมันน้อยกว่าเวลาปัจจุบันแสดงว่าหมดอายุ
    }
    return RefreshToken;
}