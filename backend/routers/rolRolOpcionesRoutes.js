import { Router } from "express";
import {RolRolOpcionesController} from "../controllers/rolRolOpcionesControllers.js";

const routerRolRolOpciones = Router();

// Rutas para las relaciones de rol y opciones
routerRolRolOpciones.get("/", RolRolOpcionesController.getRolRolOpciones);
routerRolRolOpciones.get("/:idRol/:idOpcion", RolRolOpcionesController.getIdRolRolOpciones);
routerRolRolOpciones.post("/", RolRolOpcionesController.postRolRolOpciones);
routerRolRolOpciones.put("/:oldIdRol/:oldIdOpcion", RolRolOpcionesController.putERolRolOpciones);
routerRolRolOpciones.put("/estado/:idRol/:idOpcion", RolRolOpcionesController.putEstadoRolRolOpciones);

export default routerRolRolOpciones;
