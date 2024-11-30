import { SessionsModel } from "../models/sesionModels.js";

export class SessionsController {
    // Obtener todas las sesiones activas
    static async getSessions(req, res) {
        try {
            const data = await SessionsModel.getSessions();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener las sesiones"
            });
        }
    }

    // Crear una nueva sesión
    static async insertSession(req, res) {
        try {
            const { FechaIngreso, FechaCierre, idUsuario } = req.body;

            // Validación de los campos
            if (!FechaIngreso || !FechaCierre || !idUsuario) {
                return res.status(400).send({ message: "Todos los campos son obligatorios" });
            }

            const data = await SessionsModel.postSession(req.body);
            res.status(201).send({
                message: "Sesión creada exitosamente",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear la sesión"
            });
        }
    }

}
