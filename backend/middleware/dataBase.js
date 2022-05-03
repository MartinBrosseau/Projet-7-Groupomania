const Sequelize = require('sequelize');
require('dotenv').config();

const DATABASE_NAME = process.env.DATABASE_NAME;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
console.log(USERNAME)
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to database')
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { sequelize, dbConnection }