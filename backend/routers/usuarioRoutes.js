// routers/usuariosRoutes.js
import { Router } from "express";
import { UsuariosController } from "../controllers/usuarioControllers.js";

const routerUsuario = Router();

routerUsuario.get("/usuarios/", UsuariosController.getUsuarios);
routerUsuario.get("/usuarios/:id", UsuariosController.getUsuario);
routerUsuario.post("/usuarios/", UsuariosController.insertUsuario);
routerUsuario.put("/usuarios/:id", UsuariosController.putUsuario);
routerUsuario.put("/usuarios/estado/:id", UsuariosController.putEstadoUsuario);
routerUsuario.post("/usuarios/login", UsuariosController.Login);
routerUsuario.get("/usuarios/logout/:id", UsuariosController.Logout);
routerUsuario.get("/usuarios_stats/", UsuariosController.statsUsuario);


export default routerUsuario;
