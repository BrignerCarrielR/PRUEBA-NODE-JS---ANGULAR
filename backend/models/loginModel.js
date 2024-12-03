import pool from "../database/db.js";
import {queries} from "../database/queries.js";
export class LoginModel{
    // Iniciar Sesion

    static async Login(username, password){
        const db = await pool.connect()
        try {
            const values = [username, password]
            // consultar usuario por nombre de usuario o correo
            const userQuery = await db.query(queries.getUsuarioCorreo, [username])
            if (userQuery.rowCount === 0) {
                throw new Error("Usuario no encontrado.");
            }

            const user = userQuery.rows[0];
            // Verificar si está bloqueado
            if (user.status === "Inactivo") {
                throw new Error("El usuario está Inactivo.");
            }
            if (user.status === "Bloqueado") {
                throw new Error("El usuario está bloqueado.");
            }
            console.log("Datos de usuario:", user);

            // Validar compraseña
            if (password !== user.password) {
                // Incrementar contador de intentos fallidos
                await db.query(queries.putActualizarIntentos, [user.idusuario]);

                // Verificar si se alcanzaron tres intentos fallidos
                if (user.failedattempts + 1 >= 3) {
                    await db.query(queries.putBloquearUsuario, [user.idusuario]);
                    throw new Error("El usuario ha sido bloqueado debido a múltiples intentos fallidos.");
                }

                throw new Error(`Contraseña incorrecta. Intentos restantes: ${2 - user.failedattempts}`);
            }

            // Restablecer intentos fallidos en caso de inicio de sesión exitoso
            await db.query(queries.putResetearIntentos, [user.idusuario]);

            // Verificar si ya hay sesión activa
            if (user.sessionactive === "S") {
                throw new Error("El usuario ya tiene una sesión activa.");
            }

            // Registrar inicio de sesión
            await db.query(queries.postSesion, [user.idusuario]);
            await db.query(queries.putSesionActive, [user.idusuario]);

            return {
                message: "Inicio de sesión exitoso.",
                iduser:user.idusuario, usuario: user.username, rol: user.rolname
            };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async Logout (usuarioID){
        const db = await pool.connect();
        try {
            // Verificar si el usuario tiene una sesión activa
            const sessionResult = await db.query(queries.getSesionActive, [usuarioID]);

            if (sessionResult.rowCount === 0) {
                throw new Error("Usuario no encontrado.");
            }

            const user = sessionResult.rows[0];

            if (user.sessionactive !== "S") {
                throw new Error("No hay una sesión activa para este usuario.");
            }

            // Actualizar estado de la sesión a inactivo
            await db.query(queries.putSesionInactive, [usuarioID]);
            // Actualizar fecha de cierre de sesión
            await db.query(queries.putFechaSesionInactive, [usuarioID]);

            return { message: "Cierre de sesión exitoso." };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}