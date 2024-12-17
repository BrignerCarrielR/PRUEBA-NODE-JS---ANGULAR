import express, {Router} from 'express';
import asyncController from "../middlewares/ControladorAsincronico";
import {AuthController} from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post('/login', asyncController((req: express.Request, res: express.Response) => authController.login(req, res)))
router.get('/logout/:id', asyncController((req: express.Request, res: express.Response) => authController.logout(req, res)))
router.post('/recuperar_contrasena', asyncController((req: express.Request, res: express.Response) => authController.recuperarContrasena(req, res)))

export default router;