import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class PersonaModel {
    // metodo para consultar todos los usuarios activos
    static async getPersonas() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getPersonas);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para consultar un usuario en particular por ID
    static async getPersona(idPersona) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getIdPersonas, [idPersona]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para crear un nuevo usuario
    static async createPersona(usuario) {
        const db = await pool.connect();
        try {
            const { Nombres, Apellidos, Identificacion, FechaNacimiento } = usuario;

            const values = [Nombres, Apellidos, Identificacion, FechaNacimiento];
            await db.query(queries.postPersonas, values);
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para actualizar los datos de un usuario
    static async updatePersona(idPersona, usuario) {
        const db = await pool.connect();
        try {
            const { Nombres, Apellidos, Identificacion, FechaNacimiento } = usuario;
            const values = [Nombres, Apellidos, Identificacion, FechaNacimiento, idPersona];
            await db.query(queries.putEPersonas, values);
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para cambiar el estado de un usuario a "Inactivo"
    static async deactivatePersona(idPersona) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putEstadoPersonas, [idPersona]);
            return result.rows[0];  // Retorna el usuario con estado cambiado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
