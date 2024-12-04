import {UsuarioModel} from "../models/usuarioModel.js";

export class UsuarioController {
    static async GetUsuario(req, res) {
        try {
            console.log(`[INFO] - Intento de GetUsuario recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await UsuarioModel.GetUsuario(req.params.id);

            console.log(`[INFO] - GetUsuario exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetUsuario para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetUsuario"
            });
        }
    }

    static async GetUsuariosAdmin(req, res) {
        try {
            console.log(`[INFO] - Intento de GetUsuariosAdmin recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await UsuarioModel.GetUsuariosAdmin();

            console.log(`[INFO] - GetUsuariosAdmin exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetUsuariosAdmin. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetUsuariosAdmin"
            });
        }
    }

    static async PutUsuario(req, res) {
        const {nombres, apellidos, username, mail} = req.body
        try {
            console.log(`[INFO] - Intento de PutUsuario recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await UsuarioModel.PutUsuario(req.params.id, nombres, apellidos, username, mail);

            console.log(`[INFO] - PutUsuario exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PutUsuario para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PutUsuario"
            });
        }
    }

    static async PostUsuario(req, res) {
        const {nombres, apellidos, identificacion, username, password} = req.body
        try {
            console.log(`[INFO] - Intento de PostUsuario recibido para el usuario: ${nombres}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await UsuarioModel.PostUsuario(nombres, apellidos, identificacion, username, password);

            console.log(`[INFO] - PostUsuario exitoso para el usuario: ${nombres}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostUsuario para el usuario: ${nombres}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PostUsuario"
            });
        }
    }

    static async PostUsuarios(req, res) {
        try {
            console.log(`[INFO] - Intento de PostUsuarios recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await UsuarioModel.PostUsuarios(req.body);

            console.log(`[INFO] - PostUsuarios exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostUsuarios. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud"
            });
        }
    }

    static async PutStatusUsuario(req, res) {
        const {status} = req.body
        try {
            console.log(`[INFO] - Intento de PostUsuarios recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await UsuarioModel.PutStatusUsuario(status, req.params.id);

            console.log(`[INFO] - PostUsuarios exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostUsuarios. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud"
            });
        }
    }

}