import {AuthService} from "../services/AuthService";
import {gestionarSolicitudes} from "../utils/GestionarSolicitudes";
import {Request, Response} from "express";

const authService = new AuthService();

export class AuthController {
    // consultar si existe usuario en base su username o mail

    async login(req: Request, res: Response): Promise<void> {
        const {usernameORmail, password} = req.body;
        gestionarSolicitudes(() => authService.login(usernameORmail, password), req, res)
    }

    async logout(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => authService.logout(Number(req.params.id)), req, res)
    }

    async recuperarContrasena(req: Request, res: Response): Promise<void> {
        const {nombres, apellidos, username, mail} = req.body;
        gestionarSolicitudes(() => authService.RecuerarContrasena(nombres, apellidos, username, mail), req, res)
    }

}