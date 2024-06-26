// roures/renderRoutes.js

import { Router } from "express";
import { index, login, registro, participantes, admin, } from "../controllers/renderController.js";

const router = Router()

router.get('/', index)
router.get('/login', login)
router.get('/registro', registro)
router.get('/participantes', participantes)
router.get('/admin', admin)


export default router;