import {PersonaRepository} from '../repositories/PersonaRepository';
import Persona from '../models/Persona';

export class PersonaService {
    private personaRepository: PersonaRepository;

    constructor() {
        this.personaRepository = new PersonaRepository();
    }

    async listarPersonas(): Promise<Persona[]> {
        return await this.personaRepository.obtenerTodas();
    }

    async obtenerPersonaPorId(id: number): Promise<Persona | null> {
        return await this.personaRepository.obtenerPorId(id);
    }

    async crearPersona(persona: Persona): Promise<Persona> {
        return await this.personaRepository.crear(persona);
    }

    async editarPersona(id: number, persona: Persona): Promise<Persona> {
        return await this.personaRepository.editar(id, persona);
    }

    async eliminarPersonaPorId(id: number): Promise<boolean> {
        return await this.personaRepository.eliminar(id);
    }
}
