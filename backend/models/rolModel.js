import pool from "../database/db.js";
import {queries} from "../database/queries.js";

export class RolModel {
    static async GetUsuarios() {
        const db = await pool.connect()
        try {
            const resultado = await db.query(queries.getUsuarioRol);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async GetRoles() {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getRol);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async PostROl(idrol, idusuario) {
        const db = await pool.connect();
        try {
            await db.query(queries.postRolUsuario, [idrol, idusuario]);
            return {message: 'El RolUsuario se creo correctamente'};
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}