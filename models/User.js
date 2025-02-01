const { DataTypes } = require('sequelize'); // Importamos DataTypes de Sequelize para definir tipos de datos
const sequelize = require('../config/database'); // Importamos la instancia de conexión a la base de datos
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar contraseñas

// Definimos el modelo User con sus atributos
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER, // Tipo de dato entero
    autoIncrement: true, // Se incrementa automáticamente
    primaryKey: true, // Es la clave primaria de la tabla
  },
  username: {
    type: DataTypes.STRING, // Tipo de dato string (cadena de texto)
    allowNull: false, // No permite valores nulos
    unique: true, // Debe ser único en la base de datos
    validate: {
      len: [4, 20], // Validación: el username debe tener entre 4 y 20 caracteres
    },
  },
  password: {
    type: DataTypes.STRING, // Tipo de dato string para almacenar la contraseña encriptada
    allowNull: false, // No permite valores nulos
  },
}, {
  timestamps: true, // Agrega automáticamente las columnas createdAt y updatedAt
});

// Hook de Sequelize: antes de crear un usuario, encriptamos su contraseña
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10); // Generamos un salt con factor de costo 10
  user.password = await bcrypt.hash(user.password, salt); // Encriptamos la contraseña y la guardamos en el objeto usuario
});

module.exports = User; // Exportamos el modelo para su uso en otros archivos
