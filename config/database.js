//Configuracion de la base de datos MYSQL

//Importa dotenv para leer las variables de entorno.
require('dotenv').config();

//Importa la libreria de mysql
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
