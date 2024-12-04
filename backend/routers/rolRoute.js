import {Router} from 'express';
import {RolController} from "../controllers/rolController.js";


const RolRouter = Router();

RolRouter.get("/rol_usuarios", RolController.GetUsuarios);
RolRouter.get("/rol_rol", RolController.GetRoles);
RolRouter.post("/rol", RolController.PostROl);

export default RolRouter;