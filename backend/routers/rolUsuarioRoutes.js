// routers/rolUsuariosRoutes.js
import { Router } from "express";
import { RolUsuariosController } from "../controllers/rolUsuarioControllers.js";

const routerRolUsuario = Router();

routerRolUsuario.get("/", RolUsuariosController.getRolUsuarios);
routerRolUsuario.get("/:idRol/:idUsuario", RolUsuariosController.getRolUsuario);
routerRolUsuario.post("/", RolUsuariosController.insertRolUsuario);
routerRolUsuario.put("/:idRol/:idUsuario", RolUsuariosController.putRolUsuario);
routerRolUsuario.put("/:idRol/:idUsuario/estado", RolUsuariosController.putEstadoRolUsuario);

export default routerRolUsuario;
