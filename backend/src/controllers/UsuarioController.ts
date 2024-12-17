import {Request, Response} from "express";
import {UsuarioService} from "../services/UsuarioService";
import {gestionarSolicitudes} from "../utils/GestionarSolicitudes";


const usuarioService = new UsuarioService();

export class UsuarioController {
    // Listar todos los usuarios
    async listar(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => usuarioService.listarUsuarios(), req, res)
    }

    async obtenerUsuario(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        gestionarSolicitudes(() => usuarioService.usuarioId(Number(id)), req, res)
    }

    async obtenerUsuariosAdmin(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => usuarioService.listarUsuarioAdmin(), req, res)
    }

    async editar(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const {nombres, apellidos, username, mail} = req.body;
        gestionarSolicitudes(() => usuarioService.editarUsuario(Number(id), nombres, apellidos, username, mail), req, res)
    }

    async editarStatus(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const {status} = req.body;
        gestionarSolicitudes(() => usuarioService.editarUsuarioStatus(Number(id), status), req, res)
    }

    async crear(req: Request, res: Response): Promise<void> {
        const {nombres, apellidos, identificacion, username, password} = req.body;
        gestionarSolicitudes(() => usuarioService.crearUsuario(nombres, apellidos, identificacion, username, password), req, res)
    }

    async crearUsuarios(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => usuarioService.crearUsuarios(req.body), req, res)
    }
}