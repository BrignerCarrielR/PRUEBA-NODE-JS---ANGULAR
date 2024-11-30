// models/rolOpcionesModel.js
import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolOpcionesModel {
    // Obtener todas las opciones de rol
    static async getRolOpciones() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getRolOpciones);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener una opción de rol por ID
    static async getIdRolOpciones(id) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getIdRolOpciones, [id]);
            return result.rows[0]; // Solo se devuelve el primer resultado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Crear una nueva opción de rol
    static async postRolOpciones(nombreOpcion) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.postRolOpciones, [nombreOpcion]);
            return result.rows[0]; // Retorna el primer elemento insertado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar una opción de rol
    static async putERolOpciones(id, nombreOpcion) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putERolOpciones, [nombreOpcion, id]);
            return result.rowCount; // Devuelve cuántas filas fueron actualizadas
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Cambiar el estado de una opción de rol a 'Inactivo'
    static async putEstadoRolOpciones(id) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putEstadoRolOpciones, [id]);
            return result.rowCount; // Devuelve cuántas filas fueron actualizadas
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
