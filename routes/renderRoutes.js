// renderRoutes.js

import { Router } from 'express';
import { index, login, registro, participantes } from '../controllers/renderController.js';
import { handleLogin, handleRegistro, updateSkater, handleAdmin } from '../controllers/skaterController.js';

const router = Router();

router.get('/', index);
router.get('/login', login);
router.post('/login', handleLogin); // Manejar inicio de sesión
router.get('/registro', registro);
router.post('/registro', handleRegistro); // Manejar registro de skater
router.get('/participantes', participantes); // Página de participantes
router.put('/participantes/:id', updateSkater); // Actualizar skater por ID
router.get('/admin', handleAdmin);

export default router;



















