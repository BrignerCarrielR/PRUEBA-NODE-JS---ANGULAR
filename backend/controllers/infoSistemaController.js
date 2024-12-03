import {InfoSistemaModel} from "../models/infoSistemaModel.js";

export class InfoSistemaController {
    static async DatosBienvenida(req, res) {
        try {
            console.log(`[INFO] - Intento de DatosBienvenida recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await InfoSistemaModel.DatosBienvenida(req.params.id);

            console.log(`[INFO] - DatosBienvenida exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send( data );

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer DatosBienvenida para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de DatosBienvenida"
            });
        }
    }

    static async DatosDashboard(req, res) {
        try {
            console.log(`[INFO] - Intento de DatosDashboard recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await InfoSistemaModel.DatosDashboard();

            console.log(`[INFO] - DatosDashboard exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send( data );

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer DatosDashboard para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de DatosDashboard"
            });
        }
    }

    static async MenuUserRol(req, res) {
        try {
            console.log(`[INFO] - Intento de MenuUserRol recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud de login
            const data = await InfoSistemaModel.MenuUserRol(req.params.id);

            console.log(`[INFO] - MenuUserRol exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send( data );

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer MenuUserRol para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de MenuUserRol"
            });
        }
    }

}