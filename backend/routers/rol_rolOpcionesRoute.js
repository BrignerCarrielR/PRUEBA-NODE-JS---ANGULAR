import { Router } from 'express';
import { RolRolOpcionesController } from '../controllers/rol_rolOpcionesController.js';

const RolRolOpcionesRouter = Router();

RolRolOpcionesRouter.get('/rol-rol-opciones', RolRolOpcionesController.GetRol_RolOpciones);
RolRolOpcionesRouter.get('/rol-rol-opciones/:idrol/:idopcion', RolRolOpcionesController.GetRol_RolOpcion);
RolRolOpcionesRouter.put('/rol-rol-opciones/:idrolOriginal/:idopcionOriginal', RolRolOpcionesController.PutRol_RolOpcion);
RolRolOpcionesRouter.post('/rol-rol-opciones', RolRolOpcionesController.PostRol_RolOpcion);

export default RolRolOpcionesRouter;
