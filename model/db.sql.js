const mysql = require('mysql');
const dbConfig = require("../config/dbconfig.js");

//Create a connection to the database server
const connection = mysql.createConnection({
    host: dbConfig.host,
    user:dbConfig.user,
    password:dbConfig.password,
    database:dbConfig.db
});

// Open MYSQL connection
connection.connect(
    (error)=>{
        if(error) throw error;
        console.log("Successfully connected to the database...");
    }
);

module.exports = connection;