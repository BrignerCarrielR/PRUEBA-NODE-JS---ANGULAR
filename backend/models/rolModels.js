// models/rolModel.js
import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolModel {
    // Obtener todos los roles
    static async getRoles() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getRoles);
            return result.rows;  // Retorna todos los roles encontrados
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener un rol por su ID
    static async getRolById(id) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getIdRoles, [id]);
            return result.rows[0];  // Retorna el primer rol encontrado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Insertar un nuevo rol
    static async postRol(rol) {
        const db = await pool.connect();
        try {
            const { RolName } = rol;
            const result = await db.query(queries.postRoles, [RolName]);
            return result.rows[0];  // Retorna el rol creado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar un rol
    static async putRol(id, rol) {
        const db = await pool.connect();
        try {
            const { RolName } = rol;
            const result = await db.query(queries.putERoles, [RolName, id]);
            return result.rows[0];  // Retorna el rol actualizado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar el estado de un rol
    static async putEstadoRol(id) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putEstadoRoles, [id]);
            return result.rows[0];  // Retorna el rol con el estado actualizado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
