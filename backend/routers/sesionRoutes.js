// routers/sessionsRoutes.js
import { Router } from "express";
import { SessionsController } from "../controllers/sesionControllers.js";

const routerSesion = Router();

routerSesion.get("/", SessionsController.getSessions);
routerSesion.post("/", SessionsController.insertSession);

export default routerSesion;
