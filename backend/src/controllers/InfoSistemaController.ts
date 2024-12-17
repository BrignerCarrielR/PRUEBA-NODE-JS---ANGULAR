import {Request, Response} from 'express';

import {InfoSistemaService} from "../services/InfoSistemaService";
import {gestionarSolicitudes} from "../utils/GestionarSolicitudes";

const infoService = new InfoSistemaService();

export class InfoSistemaController {

    async bienvenida(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        gestionarSolicitudes(() => infoService.DatosBienvenida(Number(id)), req, res,)
    }

    async dashboard(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => infoService.DatosDashboard(), req, res)
    }

    async menuUsuario(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        gestionarSolicitudes(() => infoService.MenuUsuario(Number(id)), req, res)
    }
}