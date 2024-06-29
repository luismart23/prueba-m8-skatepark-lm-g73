import dotenv from 'dotenv';  // Importa dotenv para cargar variables de entorno desde el archivo .env
dotenv.config();  // Carga las variables de entorno desde el archivo .env

// Exporta las variables de entorno
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  // Clave secreta para firmar y verificar JWT
export const DB_HOST = process.env.DB_HOST;                // Host de la base de datos
export const DB_USER = process.env.DB_USER;                // Usuario de la base de datos
export const DB_PASSWORD = process.env.DB_PASSWORD;        // Contraseña de la base de datos
export const DB_NAME = process.env.DB_NAME;                // Nombre de la base de datos
export const PORT = process.env.PORT || 3000;              // Puerto en el que corre el servidor, 3000 por defecto
