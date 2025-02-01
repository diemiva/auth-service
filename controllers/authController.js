// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'su_clave_secreta_aqui';

// Registro de usuario
async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}

// Inicio de sesión
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: 'Error en la autenticación' });
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Error en la autenticación' });
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Autenticación satisfactoria', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}

module.exports = { register, login };
