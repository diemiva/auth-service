require('dotenv').config(); // Cargamos las variables de entorno desde el archivo .env
const { Sequelize } = require('sequelize'); // Importamos Sequelize

// Creamos la instancia de Sequelize utilizando variables de entorno
const sequelize = new Sequelize(
  'auth_db', // Nombre de la base de datos desde .env
  'root', // Usuario de la base de datos desde .env
  'root', // Contraseña de la base de datos desde .env
  {
    host: 'localhost', // Host de la base de datos desde .env
    dialect:'mysql', // Dialecto de la base de datos desde .env
    logging: false, // Deshabilita logs de Sequelize
  }
);

// Función autoejecutable para autenticar la conexión con la base de datos
(async () => {
  try {
    await sequelize.authenticate(); // Intentamos autenticar la conexión
    console.log('Conexión establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize; // Exportamos la instancia de Sequelize