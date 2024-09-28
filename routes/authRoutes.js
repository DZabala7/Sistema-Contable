const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

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
