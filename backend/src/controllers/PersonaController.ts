import {Request, Response} from 'express';
import {PersonaService} from '../services/PersonaService';
import {gestionarSolicitudes} from "../utils/GestionarSolicitudes";

const personaService = new PersonaService();

export class PersonaController {
    // Listar todas las personas
    async listar(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => personaService.listarPersonas(), req, res);
    }

    // Obtener persona por id
    async obtenerPorId(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        gestionarSolicitudes(() => personaService.obtenerPersonaPorId(Number(id)), req, res,);
    }

    // Creamos a una nueva persona
    async crear(req: Request, res: Response): Promise<void> {
        gestionarSolicitudes(() => personaService.crearPersona(req.body), req, res);
    }

    async editar(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        gestionarSolicitudes(() => personaService.editarPersona(Number(id), req.body), req, res);
    }


    // Eliminamos a la persona(Cambiamos el estado Eliminado a true)
    async eliminarPorId(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        gestionarSolicitudes(() => personaService.eliminarPersonaPorId(Number(id)), req, res);
    }
}

