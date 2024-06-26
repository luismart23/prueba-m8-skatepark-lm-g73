// routes/skaterRoutes.js

import { Router } from "express";
import { getAllSkaters, getSkater, createSkater, removeSkater, updateSkater } from "../controllers/skaterController.js";

const router = Router()



router.get('/', getAllSkaters)
router.get('/:id', getSkater)
router.post('/', createSkater)
router.delete('/:id', removeSkater)
router.put('/:id', updateSkater)

export default router


