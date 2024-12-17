import express, {Router} from 'express';
import asyncController from "../middlewares/ControladorAsincronico";
import {UsuarioController} from "../controllers/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();

// router.get('/', asyncController((req: express.Request, res: express.Response) => usuarioController.listar(req, res)))
router.get('/:id', asyncController((req: express.Request, res: express.Response) => usuarioController.obtenerUsuario(req, res)))
router.get('/', asyncController((req: express.Request, res: express.Response) => usuarioController.obtenerUsuariosAdmin(req, res)))
router.put('/datos/:id', asyncController((req: express.Request, res: express.Response) => usuarioController.editar(req, res)))
router.put('/status/:id', asyncController((req: express.Request, res: express.Response) => usuarioController.editarStatus(req, res)))
router.post('/', asyncController((req: express.Request, res: express.Response) => usuarioController.crear(req, res)))
router.post('/excel', asyncController((req: express.Request, res: express.Response) => usuarioController.crearUsuarios(req, res)))

export default router;
