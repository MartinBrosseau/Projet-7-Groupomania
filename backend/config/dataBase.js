const mysql = require('mysql2');
require('dotenv').config();


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const DATABASENAME = process.env.DATABASE_NAME;

const dataBaseConnection = mysql.createConnection({
    host : 'localhost',
    user : USERNAME,
    password : PASSWORD,
    database : DATABASENAME
   
});

dataBaseConnection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});


module.exports = dataBaseConnection;