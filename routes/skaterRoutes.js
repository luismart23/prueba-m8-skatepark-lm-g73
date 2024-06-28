// routes/skaterRoutes.js

import { Router } from "express";
import { getAllSkaters, getSkater, handleRegistro, handleLogin, handleAdmin, removeSkater, updateSkater } from "../controllers/skaterController.js";

const router = Router();

// Rutas para obtener y manipular skaters
router.get('/', getAllSkaters);           // GET todos los skaters
router.get('/:id', getSkater);            // GET skater por ID
router.post('/', handleRegistro);         // POST registrar un nuevo skater
router.put('/:id', updateSkater);         // PUT actualizar un skater por ID
router.delete('/:id', removeSkater);      // DELETE eliminar un skater por ID

// Ruta administrativa
router.get('/admin', handleAdmin);        // GET página administrativa de skaters

// Ruta de inicio de sesión
router.post('/login', handleLogin);       // POST iniciar sesión

export default router;







