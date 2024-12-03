import pool from "../database/db.js";
import {queries} from "../database/queries.js";

export class InfoSistemaModel {
    static async DatosBienvenida(usuarioID) {
        const db = await pool.connect()
        try {
            const resultado = await db.query(queries.getDatosB, [usuarioID]);
            return resultado.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async DatosDashboard() {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getDashboard);
            return resultado.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async MenuUserRol(usuarioID) {
        const db = await pool.connect();
        try {
            const resultado = await db.query(queries.getMemuUsuario, [usuarioID]);
            return resultado.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }


}