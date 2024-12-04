import { Router } from 'express';
import { RolOpcionesController } from '../controllers/RolOpcionesController.js';

const RolOpcionesRouter = Router();

RolOpcionesRouter.get('/rol-opciones', RolOpcionesController.GetRolOpciones);
RolOpcionesRouter.get('/rol-opciones/:idopcion', RolOpcionesController.GetRolOpcion);
RolOpcionesRouter.put('/rol-opciones/:idopcion', RolOpcionesController.PutRolOpcione);
RolOpcionesRouter.post('/rol-opciones', RolOpcionesController.PostRolOpcione);

export default RolOpcionesRouter;
