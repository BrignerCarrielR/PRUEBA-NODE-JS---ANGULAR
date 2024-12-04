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

    static async PostUsuarios(usuarios) {
        const db = await pool.connect();
        try {
            const resultados = []; // lista para almacenar todos los resultados de cada iteracion

            for (const usuario of usuarios) {
                console.log(`Procesando usuario: ${usuario.nombres}`);

                // Ejecutar la consulta y capturar el resultado
                const result = await db.query(queries.postUsario, [
                    usuario.nombres,
                    usuario.apellidos,
                    usuario.identificacion,
                    usuario.username,
                    usuario.password
                ]);

                // Agregar el mensaje devuelto por la consulta al arreglo de resultados
                const mensaje = result.rows[0].crear_usuario_con_validaciones || `Usuario ${usuario.username} procesado sin mensaje específico.`;
                resultados.push({ usuario: usuario.username, mensaje });
            }
            console.log({resultados});
            // Devolver todos los resultados al final
            return {resultados} ;
        } catch (error) {
            console.error('Error procesando usuarios:', error);
            throw error;
        } finally {
            db.release();
        }
    }

    static async PutStatusUsuario(estado, id) {
        const db = await pool.connect();
        try {
            await db.query(queries.putStatusUsuario, [estado, id]);
            return {message: 'Se actualizo el estado correctamente.'};
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }





}