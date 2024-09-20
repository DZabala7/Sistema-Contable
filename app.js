const express = require('express');
const session = require('express-session');
const app = express();
const authRoutes = require('./routes/authRoutes');

// Configurar sesiones
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: false }));



app.use(express.static('public'));


// Configurar motor de vistas
app.set('view engine', 'ejs');

// Rutas de autenticación
app.use(authRoutes);

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
