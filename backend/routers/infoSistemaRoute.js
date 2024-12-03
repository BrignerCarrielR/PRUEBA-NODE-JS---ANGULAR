import {Router} from 'express';
import {InfoSistemaController} from "../controllers/infoSistemaController.js";


const InfoSistemaRouter = Router();

InfoSistemaRouter.get("/datos_bienvenida/:id", InfoSistemaController.DatosBienvenida);
InfoSistemaRouter.get("/datos_dashboard", InfoSistemaController.DatosDashboard);
InfoSistemaRouter.get("/menu_usuario/:id", InfoSistemaController.MenuUserRol);

export default InfoSistemaRouter;