//Sequelize.STRING เป็นส่วนหนึ่งของ Sequelize ซึ่งเป็นไลบรารี Object- Relational Mapping (ORM)
module.exports = (sequelize,Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.STRING,
            primaryKey:true
        },
        name: {
            type: Sequelize.STRING,
        }
    });
    return Role;
}