require('dotenv').config(); // Cargamos variables de entorno desde el archivo .env
const express = require('express'); // Importamos Express
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar contraseñas
const User = require('./models/User'); // Importamos el modelo de usuario
const sequelize = require('./config/database'); // Importamos la conexión con la base de datos

const app = express(); // Creamos la aplicación Express
app.use(express.json()); // Middleware para procesar JSON en las peticiones

// Conectar y sincronizar base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Registro de usuarios
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear nuevo usuario en la base de datos
    const user = await User.create({ username, password: hashedPassword });
    
    res.json({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.json({ message: 'Autenticación satisfactoria' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

// Iniciar servidor en el puerto definido en las variables de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
