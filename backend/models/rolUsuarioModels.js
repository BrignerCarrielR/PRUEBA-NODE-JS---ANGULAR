// models/rolUsuariosModel.js
import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class RolUsuariosModel {
    // Obtener todos los roles de usuarios
    static async getRolUsuarios() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getRolUsuarios);
            return result.rows;  // Retorna todos los roles de usuarios encontrados
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener un rol de usuario por ID de rol y de usuario
    static async getRolUsuarioById(idRol, idUsuario) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getIdRolUsuarios, [idRol, idUsuario]);
            return result.rows[0];  // Retorna el rol de usuario encontrado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Insertar un nuevo rol de usuario
    static async postRolUsuario(rolUsuario) {
        const db = await pool.connect();
        try {
            const { idRol, idUsuario } = rolUsuario;
            const result = await db.query(queries.postRolUsuarios, [idRol, idUsuario]);
            return result.rows[0];  // Retorna el rol de usuario creado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar un rol de usuario
    static async putRolUsuario(idRol, idUsuario, newRolUsuario) {
        const db = await pool.connect();
        try {
            const { idRol: newIdRol, idUsuario: newIdUsuario } = newRolUsuario;
            const result = await db.query(queries.putERolUsuarios, [newIdRol, newIdUsuario, idRol, idUsuario]);
            return result.rows[0];  // Retorna el rol de usuario actualizado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Cambiar el estado de un rol de usuario
    static async putEstadoRolUsuario(idRol, idUsuario) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putEstadoRolUsuarios, [idRol, idUsuario]);
            return result.rows[0];  // Retorna el rol de usuario con estado actualizado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}
