import {Router} from 'express';
import {UsuarioController} from "../controllers/usuarioController.js";


const UsuarioRouter = Router();

UsuarioRouter.get("/usuarios/:id", UsuarioController.GetUsuario);
UsuarioRouter.get("/usuarios", UsuarioController.GetUsuariosAdmin);
UsuarioRouter.put("/usuarios/:id", UsuarioController.PutUsuario);
UsuarioRouter.put("/usuarios_status/:id", UsuarioController.PutStatusUsuario);
UsuarioRouter.post("/usuarios", UsuarioController.PostUsuario);
UsuarioRouter.post("/usuarios_excel", UsuarioController.PostUsuarios);

export default UsuarioRouter;