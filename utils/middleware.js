/// middleware.js
import { verifyToken } from './jwt.js';

export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).redirect('/login');  // Redirige al login si no hay token
    }

    try {
        const decoded = verifyToken(token);
        req.skater_id = decoded.skater_id;
        req.email = decoded.email;  // Puedes acceder al email
        req.nombre = decoded.nombre;  // Puedes acceder al nombre
        next();
    } catch (err) {
        console.error('Token inválido:', err);
        res.status(403).redirect('/login');  // Redirige al login si el token es inválido
    }
};



