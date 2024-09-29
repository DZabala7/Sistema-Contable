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

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static('public'));

// Configurar motor de vistas
app.set('view engine', 'ejs');

// Rutas de autenticación
app.use(authRoutes);

// Proteger rutas (Ejemplo)
app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirige si el usuario no está logueado
    }
    res.render('dashboard', {role: req.session.role}); // Renderiza la vista del dashboard y pasa el rol del usuario a la vista
});

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
