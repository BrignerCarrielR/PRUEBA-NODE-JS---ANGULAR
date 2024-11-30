import pool from "../database/db.js";
import {queries} from "../database/queries.js";

export class UsuariosModel {
    // Obtener todos los usuarios
    static async getUsuarios() {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getUsuarios);
            return result.rows;  // Retorna todos los usuarios encontrados
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Obtener un usuario por su ID
    static async getUsuarioById(id) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.getIdUsuarios, [id]);
            return result.rows[0];  // Retorna el primer usuario encontrado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Insertar un nuevo usuario
    static async postUsuario(usuario) {
        const db = await pool.connect();
        try {
            const { UserName, Password, Persona_idPersona} = usuario;


            let emailBase = `${UserName}@mail.com`;

            // Validar correo duplicado
            let emailDuplicado = true;
            let contador = 0;
            let Mail = emailBase;
            while (emailDuplicado) {
                const emailCheck = await db.query("SELECT Mail FROM Usuarios WHERE Mail = $1", [Mail]);
                if (emailCheck.rowCount === 0) emailDuplicado = false;
                else Mail = `${UserName}${++contador}@mail.com`;
            }

            // Validación de UserName
            if (!/^[a-zA-Z0-9]+$/.test(UserName)) {
                throw new Error("El nombre de usuario no debe contener signos.");
            }
            if (!/[A-Z]/.test(UserName)) {
                throw new Error("El nombre de usuario debe tener al menos una letra mayúscula.");
            }
            if (!/\d/.test(UserName)) {
                throw new Error("El nombre de usuario debe tener al menos un número.");
            }
            if (UserName.length < 8 || UserName.length > 20) {
                throw new Error("El nombre de usuario debe tener entre 8 y 20 caracteres.");
            }

            // Validación de contraseña
            if (Password.length < 8) {
                throw new Error("La contraseña debe tener al menos 8 caracteres.");
            }
            if (!/[A-Z]/.test(Password)) {
                throw new Error("La contraseña debe contener al menos una letra mayúscula.");
            }
            if (/\s/.test(Password)) {
                throw new Error("La contraseña no debe contener espacios.");
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(Password)) {
                throw new Error("La contraseña debe contener al menos un signo especial.");
            }

            // Insertar usuario
            const SessionActive = "N";
            const Status = "A";
            const result = await db.query(queries.postUsuarios, [UserName, Password, Mail, SessionActive, Persona_idPersona, Status]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar un usuario
    static async putUsuario(id, usuario) {
        const db = await pool.connect();
        try {
            const {UserName, Password, Mail, SessionActive, Persona_idPersona, Status} = usuario;
            const result = await db.query(queries.putEUsuarios, [UserName, Password, Mail, SessionActive, Persona_idPersona, Status, id]);
            return result.rows[0];  // Retorna el usuario actualizado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // Actualizar el estado de un usuario
    static async putEstadoUsuario(id) {
        const db = await pool.connect();
        try {
            const result = await db.query(queries.putEstadoUsuarios, [id]);
            return result.rows[0];  // Retorna el usuario con el estado actualizado
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
    // InciarSesion
    static async login(credentials) {
        const db = await pool.connect();
        try {
            const { UserNameOrEmail, Password } = credentials;
            console.log(UserNameOrEmail);

            // Consultar usuario por correo o nombre de usuario
            const userQuery = `SELECT idUsuario,username, Password, SessionActive, Status, Estado, FailedAttempts FROM Usuarios WHERE (UserName = $1 OR Mail = $1) AND estado = 'A';`;
            const userResult = await db.query(userQuery, [UserNameOrEmail]);
            console.log(userResult);

            if (userResult.rowCount === 0) {
                throw new Error("Usuario no encontrado.");
            }

            const user = userResult.rows[0];

            // Verificar si está bloqueado
            if (user.status === "I") {
                throw new Error("El usuario está bloqueado.");
            }

            console.log("Datos de usuario:", user);

            // Validar contraseña
            if (Password !== user.password) {
                // Incrementar contador de intentos fallidos
                const updateAttemptsQuery = `UPDATE Usuarios SET FailedAttempts = FailedAttempts + 1 WHERE idUsuario = $1;`;
                await db.query(updateAttemptsQuery, [user.idusuario]);

                // Verificar si se alcanzaron tres intentos fallidos
                if (user.failedattempts + 1 >= 3) {
                    const blockUserQuery = `UPDATE Usuarios SET Status = 'I' WHERE idUsuario = $1;`;
                    await db.query(blockUserQuery, [user.idusuario]);
                    throw new Error("El usuario ha sido bloqueado debido a múltiples intentos fallidos.");
                }

                throw new Error(`Contraseña incorrecta. Intentos restantes: ${2 - user.failedattempts}`);
            }

            // Restablecer intentos fallidos en caso de inicio de sesión exitoso
            const resetAttemptsQuery = `UPDATE Usuarios SET FailedAttempts = 0 WHERE idUsuario = $1;`;
            await db.query(resetAttemptsQuery, [user.idusuario]);

            // Verificar si ya hay sesión activa
            if (user.sessionactive === "A") {
                throw new Error("El usuario ya tiene una sesión activa.");
            }

            // Registrar inicio de sesión


            return {
                message: "Inicio de sesión exitoso.",
                iduser:user.idusuario, usuario: user.username, status:user.status
            };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }


    // CerrarSesion
    static async logout(userId) {
        const db = await pool.connect();
        try {
            // Verificar si el usuario tiene una sesión activa
            const sessionQuery = `SELECT SessionActive FROM Usuarios WHERE idUsuario = $1;`;
            const sessionResult = await db.query(sessionQuery, [userId]);

            if (sessionResult.rowCount === 0) {
                throw new Error("Usuario no encontrado.");
            }

            const user = sessionResult.rows[0];

            if (user.sessionactive !== "A") {
                throw new Error("No hay una sesión activa para este usuario.");
            }

            // Actualizar estado de la sesión a inactivo
            const updateSession = `UPDATE Usuarios SET SessionActive = 'I' WHERE idUsuario = $1;`;
            await db.query(updateSession, [userId]);

            return { message: "Cierre de sesión exitoso." };
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }


}
