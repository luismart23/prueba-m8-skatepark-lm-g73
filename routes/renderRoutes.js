// renderRoutes.js

import { Router } from 'express';
import { index, login, registro, participantes } from '../controllers/renderController.js';
import { handleLogin, handleRegistro, handleAdmin, updateSkater } from '../controllers/skaterController.js';

const router = Router();

router.get('/', index); // Página principal
router.get('/login', login); // Página de inicio de sesión
router.post('/login', handleLogin); // Manejar inicio de sesión
router.get('/registro', registro); // Página de registro de skater
router.post('/registro', handleRegistro); // Manejar registro de skater
router.get('/participantes', participantes); // Página de participantes
router.put('/participantes/:id', updateSkater); // Actualizar skater por ID
router.get('/admin', handleAdmin); // Página de administración

export default router;





















