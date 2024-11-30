// routers/usuariosRoutes.js
import { Router } from "express";
import { UsuariosController } from "../controllers/usuarioControllers.js";

const routerUsuario = Router();

routerUsuario.get("/", UsuariosController.getUsuarios);
routerUsuario.get("/:id", UsuariosController.getUsuario);
routerUsuario.post("/", UsuariosController.insertUsuario);
routerUsuario.put("/:id", UsuariosController.putUsuario);
routerUsuario.put("/:id/estado", UsuariosController.putEstadoUsuario);
routerUsuario.post("/login", UsuariosController.Login);
routerUsuario.get("/logout/:id", UsuariosController.Logout);

export default routerUsuario;
