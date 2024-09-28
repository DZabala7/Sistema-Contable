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
                    req.session.role_id = user.rol_id;  // Guardar rol en la sesión
                    req.session.role_name = user.role_name;
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
    },

     // Middleware para verificar si el usuario es administrador
     isAdmin: (req, res, next) => {
        if (req.session.rol === 'admin') {
            return next();  // Si es administrador, continuar con la acción
        }
        return res.status(403).send('Acceso denegado: No tienes permisos de administrador');
    }
};

module.exports = authController;
