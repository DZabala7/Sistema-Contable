const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authController = {
    // Procesar login
    login: (req, res) => {
        const { username, password } = req.body;  // Obtener datos del formulario

        // Buscar usuario en la base de datos
        User.findByUsername(username, (user) => {
            if (!user) {
                return res.send('Usuario no encontrado');
            }

            // Comparar la contraseña con la almacenada (encriptada)
            bcrypt.compare(password, user.password, (err, match) => {
                if (match) {
                    // Si coincide, crear sesión
                    req.session.userId = user.id;
                    req.session.username = user.username;
                    return res.redirect('/dashboard');  // Redirigir al dashboard o área protegida
                } else {
                    return res.send('Contraseña incorrecta');
                }
            });
        });
    },

    // Cerrar sesión
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');  // Redirigir al login después de cerrar sesión
        });
    }
};

module.exports = authController;
