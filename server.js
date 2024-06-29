// server.js

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import renderRoutes from './routes/renderRoutes.js';
import skaterRoutes from './routes/skaterRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { verifyToken } from './utils/jwt.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Handlebars como motor de plantillas
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON y datos de formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = verifyToken(token);  // Verifica el token y decodifica su contenido
            req.skater_id = decoded.skater_id;  // Extrae el skater_id del token
        } catch (err) {
            console.error('Token inválido:', err);
        }
    }
    next();
});


// Middleware para manejar rutas relacionadas con skaters
app.use('/api/v1/skater', skaterRoutes);

// Middleware para manejar rutas de renderización de vistas
app.use('/', renderRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Middleware para manejar errores 500 (errores internos del servidor)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
