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

module.exports = router;
