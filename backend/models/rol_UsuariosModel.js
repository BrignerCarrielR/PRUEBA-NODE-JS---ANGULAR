import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolUsuariosModel {
    // Obtener todas las asociaciones de rol-usuario que no están eliminadas
    static async GetRol_Usuarios() {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRol_Usuarios);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener una asociación específica entre rol y usuario
    static async GetRol_Usuario(idrol, idusuario) {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRol_Usuario, [idrol, idusuario]);
            return resultado.rows.length > 0 ? resultado.rows[0] : null;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar una asociación entre rol y usuario
    static async PutRol_Usuario(idrol, idusuario, eliminado, idrolOriginal, idusuarioOriginal) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putRol_Usuario, [idrol, idusuario, eliminado, idrolOriginal, idusuarioOriginal]);
            if (result.rowCount === 0) {
                throw new Error('No se encontró la asociación para actualizar');
            }
            return { message: 'Asociación rol-usuario actualizada correctamente' };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Crear una nueva asociación entre rol y usuario
    static async PostRol_Usuario(idrol, idusuario) {
        const db = await pool.connect();
        try {
            await db.query(queries.postRol_Usuario, [idrol, idusuario]);
            return { message: 'Asociación rol-usuario creada correctamente' };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
