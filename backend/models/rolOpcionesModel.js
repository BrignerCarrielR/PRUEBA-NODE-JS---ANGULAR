import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolOpcionesModel {
    // Obtener todas las opciones de rol que no estén eliminadas
    static async GetRolOpciones() {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRolOpciones);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener una opción de rol por su ID
    static async GetRolOpcion(idopcion) {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRolOpcion, [idopcion]);
            return resultado.rows.length > 0 ? resultado.rows[0] : null;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar una opción de rol
    static async PutRolOpcione(idopcion, nombreopcion, url, eliminado) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putRolOpcione, [nombreopcion, url, eliminado, idopcion]);
            if (result.rowCount === 0) {
                throw new Error('No se encontró la opción para actualizar');
            }
            return { message: 'Opción de rol actualizada correctamente' };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Crear una nueva opción de rol
    static async PostRolOpcione(nombreopcion, url) {
        const db = await pool.connect();
        try {
            await db.query(queries.postRolOpcione, [nombreopcion, url]);
            return { message: 'Opción de rol creada correctamente' };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
