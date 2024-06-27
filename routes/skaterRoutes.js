// routes/skaterRoutes.js

import { Router } from "express";
import { getAllSkaters, getSkater, createSkater, removeSkater, updateSkater, loginSkater } from "../controllers/skaterController.js";

const router = Router();

router.get('/', getAllSkaters);
router.get('/:id', getSkater);
router.post('/registro', createSkater);
router.delete('/:id', removeSkater);
router.put('/:id', updateSkater);
router.post('/login', loginSkater);

export default router;



