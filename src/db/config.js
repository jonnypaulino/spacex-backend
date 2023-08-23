const { Sequelize } = require("sequelize");



const dbName = 'space-db';
const dbUser = 'root';
const dbHost = 'localhost';
const dbPassword = 'root';

const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: dbHost,
    database: dbName,
    username: dbUser,
    password: dbPassword,
  });

module.exports = sequelize;