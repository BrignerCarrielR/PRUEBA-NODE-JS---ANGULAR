// routers/rolOpcionesRoutes.js
import { Router } from "express";
import {RolOpcionesController} from "../controllers/rolOpcionesControllers.js";

const routerRolOpciones = Router();

// Rutas para las opciones de rol
routerRolOpciones.get("/", RolOpcionesController.getRolOpciones);
routerRolOpciones.get("/:id", RolOpcionesController.getIdRolOpciones);
routerRolOpciones.post("/", RolOpcionesController.postRolOpciones);
routerRolOpciones.put("/:id", RolOpcionesController.putERolOpciones);
routerRolOpciones.put("/estado/:id", RolOpcionesController.putEstadoRolOpciones);

export default routerRolOpciones;
