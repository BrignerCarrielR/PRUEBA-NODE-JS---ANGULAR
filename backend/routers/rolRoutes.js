// routers/rolRoutes.js
import { Router } from "express";
import { RolController } from "../controllers/rolControllers.js";

const routerRol = Router();

routerRol.get("/", RolController.getRoles);
routerRol.get("/:id", RolController.getRol);
routerRol.post("/", RolController.insertRol);
routerRol.put("/:id", RolController.putRol);
routerRol.put("/:id/estado", RolController.putEstadoRol);

export default routerRol;
