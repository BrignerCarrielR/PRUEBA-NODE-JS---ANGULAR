import {RolModel} from "../models/rolModel.js";

export class RolController {
    static async GetUsuarios(req, res) {
        try {
            console.log(`[INFO] - Intento de GetUsuario recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await RolModel.GetUsuarios(req.params.id);

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

    static async GetRoles(req, res) {
        try {
            console.log(`[INFO] - Intento de GetRoles recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await RolModel.GetRoles();

            console.log(`[INFO] - GetRoles exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRoles. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRoles"
            });
        }
    }

    static async PostROl(req, res) {
        const {idrol, idusuario} = req.body
        try {
            console.log(`[INFO] - Intento de PostROl recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await RolModel.PostROl(parseInt(idrol), parseInt(idusuario));

            console.log(`[INFO] - PostROl exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostROl para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PostROl"
            });
        }
    }
}