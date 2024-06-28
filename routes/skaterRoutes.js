// skaterRoutes.js

import { Router } from "express";
import {
    getAllSkaters,
    getSkater,
    handleRegistro,
    handleLogin,
    handleAdmin,
    removeSkater,
    updateSkater
} from "../controllers/skaterController.js";

const router = Router();

router.get('/', getAllSkaters); // Obtener todos los skaters
router.get('/:id', getSkater); // Obtener skater por ID
router.get('/admin', handleAdmin); // Página administrativa de skaters
router.post('/registro', handleRegistro); // Registrar un nuevo skater
router.delete('/:id', removeSkater); // Eliminar skater por ID
router.put('/:id', updateSkater); // Actualizar skater por ID
router.post('/login', handleLogin); // Iniciar sesión

export default router;










