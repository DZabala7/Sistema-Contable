const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const connection = require('../config/db');
const authController = require('../controllers/authController');

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register');  // Renderiza la vista register.ejs
});

// Ruta para procesar el registro
router.post('/register', (req, res) => {
    const { username, password, email, role } = req.body;

    // Encriptar la contraseña antes de guardarla
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        // Inserta el nuevo usuario en la base de datos
        const query = `INSERT INTO users (username, password, email, rol_id) VALUES (?, ?, ?, ?)`;
        connection.query(query, [username, hashedPassword, email, role], (err, result) => {
            if (err) throw err;
            res.redirect('/login');  // Redirige al login después de registrar el usuario
        });
    });
});

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.render('login');  // Renderiza la vista del formulario de login (login.ejs)
});

// Ruta para procesar el login
router.post('/login', authController.login);

// Ruta para cerrar sesión
router.get('/logout', authController.logout);

// Ruta del dashboard (visible para todos los usuarios logueados)
router.get('/dashboard', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/login');
    }
    res.render('dashboard', { role: req.session.role_name });
});

// Ruta de ejemplo protegida para el administrador
router.get('/admin', authController.isAdmin, (req, res) => {
    res.send('Bienvenido administrador');
});

module.exports = router;
