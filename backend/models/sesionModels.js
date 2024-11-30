import pool from "../database/db.js";
import { queries } from "../database/queries.js";

export class SessionsModel {
    // Obtener todas las sesiones activas
    static async getSessions() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getSessions);
            return result.rows;  // Retorna todas las sesiones activas
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }



    // Crear una nueva sesión
    static async postSession(session) {
        const db = await pool.connect();
        try {
            const { FechaIngreso, FechaCierre, idUsuario } = session;
            const result = await db.query(queries.postSessions, [FechaIngreso, FechaCierre, idUsuario]);
            return result.rows[0];  // Retorna la sesión creada
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

}
