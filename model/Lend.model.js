const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Lend = sequelize.define("res", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
});

// คำสั่งการสร้างตารางเมื่อไม่มีตารางนั้นจะสร้างขึ้นมาให้ 
// Lend.sync({ force: true }).then(() => {
//     console.log("Table created or already exists");
// })
//     .catch((error) => {
//         console.error("error creating table:", error);
//     });

module.exports = Lend;
