// server.js


import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import renderRoutes from './routes/renderRoutes.js';
import skaterRoutes from './routes/skaterRoutes.js';
import { handleLogin, handleRegistro } from './controllers/skaterController.js'; // Importamos los controladores de skater

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de Handlebars como motor de plantillas
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para manejar solicitudes JSON y URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Middleware para manejar la carga de archivos
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
    abortOnLimit: true,
    responseOnLimit: "El tamaño del archivo supera el límite permitido (5MB)",
}));

// Middleware para servir archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));

// Rutas renderizadas con Handlebars
app.use('/', renderRoutes);

// Rutas /skater API
app.use('/api/v1/skater', skaterRoutes);

// Manejo de inicio de sesión
app.post('/login', handleLogin);

// Manejo de registro de skater
app.post('/registro', handleRegistro);


// Middleware para manejar errores 404 (no encontrado)
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Middleware para manejar errores 500 (error interno del servidor)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
});

// Puerto en el que escucha el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

