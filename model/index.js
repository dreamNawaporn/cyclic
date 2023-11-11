const config = require("../config/dbconfig")
//Sequelizeตั้งชื่อตัวแปรObjectrequireไปเป็นObject(ออฟเจก)Sequelize
//sequelize คือคราสObjectอินสแตน เป็นORM Object Relotional Mapping หน้าที่ของORMใช้ในการMappingคู่กับฟังชั่นข้างหลัง
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
        ssl: {
            required: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//เอาไปเก็บที่ db.Sequelize พอเวลาใช้ก็ไปอินพอดมันมา


db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.role = require("./refreshToken.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user,{
    through:"user_roles"
});
// one to many
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

//one to one
db.refreshToken(db.user,{
    foreignKey:"userId",
    targetKey:"id",
});
db.user.hasOne(db.refreshToken,{
    foreignKey:"userId",
    targetKey:"id",
})


db.ROLES = ["user", "admin", "moderator"]

module.exports = db;
