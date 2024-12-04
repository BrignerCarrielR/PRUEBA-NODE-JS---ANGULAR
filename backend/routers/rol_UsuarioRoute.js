import { Router } from 'express';
import { RolUsuariosController } from '../controllers/rol_UsuarioController.js';

const RolUsuariosRouter = Router();

RolUsuariosRouter.get('/rol-usuarios', RolUsuariosController.GetRol_Usuarios);
RolUsuariosRouter.get('/rol-usuarios/:idrol/:idusuario', RolUsuariosController.GetRol_Usuario);
RolUsuariosRouter.put('/rol-usuarios/:idrolOriginal/:idusuarioOriginal', RolUsuariosController.PutRol_Usuario);
RolUsuariosRouter.post('/rol-usuarios', RolUsuariosController.PostRol_Usuario);

export default RolUsuariosRouter;
