// renderRoutes.js

import { Router } from "express";
import { index, login, registro, participantes, admin } from "../controllers/renderController.js";
import { handleLogin, handleRegistro } from "../controllers/skaterController.js"; // Importar handleLogin y handleRegistro

const router = Router();

router.get('/', index);
router.get('/login', login);
router.post('/login', handleLogin); // Utilizar handleLogin para la solicitud POST de inicio de sesión
router.get('/registro', registro);
router.post('/registro', handleRegistro); // Utilizar handleRegistro para la solicitud POST de registro
router.get('/participantes', participantes);
router.get('/admin', admin);

export default router;








