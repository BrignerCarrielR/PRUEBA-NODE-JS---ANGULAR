import Persona from '../models/Persona';

export class PersonaRepository {
    async obtenerTodas(): Promise<Persona[]> {
        return await Persona.findAll({where: {eliminado: false}});
    }

    async obtenerPorId(id: number): Promise<Persona | null> {
        return await Persona.findOne({where: {idpersona: id, eliminado: false}});
    }

    async crear(datosPersona: Partial<Persona>): Promise<Persona> {
        try {
            // construimos una instancia del modelo Persona
            const persona = Persona.build(datosPersona);

            await persona.save(); // Guardamos la instancia en la base de datos
            return persona;
        } catch (error: any) {
            throw new Error(`Error al guardar la persona: ${error.message}`);
        }
    }

    async editar(id: number, editarPersona: Persona): Promise<Persona> {
        const persona = await Persona.findOne({where: {idpersona: id, eliminado: false}})

        if (!persona) {
            throw new Error('Error al editar, la persona no existe');
        }
        await persona.update(editarPersona);

        return persona;
    }

    async eliminar(id: number): Promise<boolean> {
        const persona = await Persona.findOne({where: {idpersona: id, eliminado: false}})

        if (!persona) {
            throw new Error('Persona no encontrada o ya fue eliminada.')
        }

        await persona.update({eliminado: true}); // eliminamos de manera logica el registro

        return true;
    }
}
