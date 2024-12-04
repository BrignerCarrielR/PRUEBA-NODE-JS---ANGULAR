import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolRolOpcionesModel {
    // Obtener todas las asociaciones entre roles y opciones que no estén eliminadas
    static async GetRol_RolOpciones() {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRol_RolOpciones);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener una asociación específica entre rol y opción
    static async GetRol_RolOpcion(idrol, idopcion) {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRol_RolOpcion, [idrol, idopcion]);
            return resultado.rows.length > 0 ? resultado.rows[0] : null;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar una asociación entre rol y opción
    static async PutRol_RolOpcion(idrol, idopcion, eliminado, idrolOriginal, idopcionOriginal) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putRol_RolOpcion, [idrol, idopcion, eliminado, idrolOriginal, idopcionOriginal]);
            if (result.rowCount === 0) {
                throw new Error('No se encontró la asociación para actualizar');
            }
            return { message: 'Asociación rol-opción actualizada correctamente' };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Crear una nueva asociación entre rol y opción
    static async PostRol_RolOpcion(idrol, idopcion) {
        const db = await pool.connect();
        try {
            await db.query(queries.postRol_RolOpcion, [idrol, idopcion]);
            return { message: 'Asociación rol-opción creada correctamente' };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
