const connection = require('../config/db');

const User = {
    // Buscar al usuario por nombre de usuario
    findByUsername: (username, callback) => {
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) throw err;
            callback(results[0]);  // Retorna el primer resultado si lo encuentra
        });
    },
};

module.exports = User;
