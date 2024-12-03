import {Router} from 'express';
import {UsuarioController} from "../controllers/usuarioController.js";


const UsuarioRouter = Router();

UsuarioRouter.get("/usuarios/:id", UsuarioController.GetUsuario);
UsuarioRouter.get("/usuarios", UsuarioController.GetUsuariosAdmin);
UsuarioRouter.put("/usuarios/:id", UsuarioController.PutUsuario);
UsuarioRouter.post("/usuarios", UsuarioController.PostUsuario);

export default UsuarioRouter;