// index.js
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/register', authController.register);
app.post('/login', authController.login);

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});
