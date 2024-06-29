// utils/jwt.js

import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config.js';  // Asegúrate de que JWT_SECRET_KEY está importado desde config.js

// Generar un token con más información
export const generateToken = (skater) => {
    if (!JWT_SECRET_KEY) {
        throw new Error('La clave secreta de JWT no está definida en las variables de entorno');
    }

    // Crear un payload con información adicional
    const payload = {
        skater_id: skater.id,
        email: skater.email,
        nombre: skater.nombre
    };

    // Firmar el token
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });  // Ajusta el tiempo de expiración aquí
};

// Verificar el token
export const verifyToken = (token) => {
    if (!JWT_SECRET_KEY) {
        throw new Error('La clave secreta de JWT no está definida en las variables de entorno');
    }
    return jwt.verify(token, JWT_SECRET_KEY);
};

