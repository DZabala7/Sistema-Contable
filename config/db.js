const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',            // Usuario root
    password: 'password',    // Contraseña para MySQL
    database: 'contable_db'  // Nombre de la base de datos
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

module.exports = connection;
