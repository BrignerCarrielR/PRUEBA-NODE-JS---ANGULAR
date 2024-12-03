import pool from "../database/db.js";
import {queries} from "../database/queries.js";

export class UsuarioModel {
    static async GetUsuario(usuarioID) {
        const db = await pool.connect()
        try {
            const resultado = await db.query(queries.getUsuario, [usuarioID]);
            return resultado.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async GetUsuariosAdmin() {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getUsuariosAdmin);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async PutUsuario(usuarioID, nombres, apellidos, username, mail) {
        const db = await pool.connect();
        try {
            await db.query(queries.putUsuario, [usuarioID, nombres, apellidos, username, mail]);
            return {message: 'El usuario se actualizó correctamente'};
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async PostUsuario(nombres, apellidos, identificacion, username, password) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.postUsario, [nombres, apellidos, identificacion, username, password]);
            const resultado = result.rows[0];  // Capturar el mensaje de la función
            console.log(resultado);  // Mostrar el resultado
            return resultado;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }


}