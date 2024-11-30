// models/rolRolOpcionesModel.js
import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolRolOpcionesModel {
    // Obtener todas las relaciones de rol y opciones activas
    static async getRolRolOpciones() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getRolRolOpciones);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener una relación de rol y opción por idRol y idOpcion
    static async getIdRolRolOpciones(idRol, idOpcion) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getIdRolRolOpciones, [idRol, idOpcion]);
            return result.rows[0]; // Devuelve el primer resultado encontrado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Crear una nueva relación de rol y opción
    static async postRolRolOpciones(idRol, idOpcion) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.postRolRolOpciones, [idRol, idOpcion]);
            return result.rows[0]; // Retorna la relación creada
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar una relación de rol y opción
    static async putERolRolOpciones(idRol, idOpcion, oldIdRol, oldIdOpcion) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putERolRolOpciones, [idRol, idOpcion, oldIdRol, oldIdOpcion]);
            return result.rowCount; // Devuelve la cantidad de filas actualizadas
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Cambiar el estado de una relación de rol y opción a 'Inactivo'
    static async putEstadoRolRolOpciones(idRol, idOpcion) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putEstadoRolRolOpciones, [idRol, idOpcion]);
            return result.rowCount; // Devuelve la cantidad de filas actualizadas
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
