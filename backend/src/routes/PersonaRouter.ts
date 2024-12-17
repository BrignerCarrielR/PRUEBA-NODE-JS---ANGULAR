import express, {Router} from 'express';
import asyncController from "../middlewares/ControladorAsincronico";
import {PersonaController} from '../controllers/PersonaController';

const router = Router();
const personaController = new PersonaController();

router.get('/', asyncController((req: express.Request, res: express.Response) => personaController.listar(req, res)));
router.get('/:id', asyncController((req: express.Request, res: express.Response) => personaController.obtenerPorId(req, res)));
router.post('/', asyncController((req: express.Request, res: express.Response) => personaController.crear(req, res)));
router.put('/:id', asyncController((req: express.Request, res: express.Response) => personaController.editar(req, res)));
router.delete('/:id', asyncController((req: express.Request, res: express.Response) => personaController.eliminarPorId(req, res)));

export default router;
