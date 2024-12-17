import express, {Router} from 'express';
import asyncController from "../middlewares/ControladorAsincronico";
import {InfoSistemaController} from "../controllers/InfoSistemaController";

const router = Router();
const infoController = new InfoSistemaController();

router.get('/datos_bienvenida/:id', asyncController((req: express.Request, res: express.Response) => infoController.bienvenida(req, res)))
router.get('/datos_dashboard', asyncController((req: express.Request, res: express.Response) => infoController.dashboard(req, res)))
router.get('/menu_usuario/:id', asyncController((req: express.Request, res: express.Response) => infoController.menuUsuario(req, res)))

export default router;