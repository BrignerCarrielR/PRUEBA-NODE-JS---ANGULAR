import { RolOpcionesModel } from "../models/RolOpcionesModel.js";

export class RolOpcionesController {
    // Obtener todas las opciones de rol que no estén eliminadas
    static async GetRolOpciones(req, res) {
        try {
            console.log(`[INFO] - Intento de GetRolOpciones recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await RolOpcionesModel.GetRolOpciones();

            console.log(`[INFO] - GetRolOpciones exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);  // Cambié a 200 ya que es una consulta GET

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRolOpciones. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRolOpciones"
            });
        }
    }

    // Obtener una opción de rol por su ID
    static async GetRolOpcion(req, res) {
        const { idopcion } = req.params;  // ID de la opción del rol
        try {
            console.log(`[INFO] - Intento de GetRolOpcion recibido para idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await RolOpcionesModel.GetRolOpcion(idopcion);

            if (!data) {
                console.log(`[INFO] - No se encontró la opción de rol con idopcion: ${idopcion}`);
                return res.status(404).send({ message: "Opción de rol no encontrada" });
            }

            console.log(`[INFO] - GetRolOpcion exitoso para idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRolOpcion para idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRolOpcion"
            });
        }
    }

    // Actualizar una opción de rol
    static async PutRolOpcione(req, res) {
        const { idopcion, nombreopcion, url, eliminado } = req.body;  // Datos enviados en el cuerpo de la solicitud
        try {
            console.log(`[INFO] - Intento de PutRolOpcione recibido para idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Validar parámetros antes de proceder
            if (!idopcion || !nombreopcion || !url) {
                return res.status(400).send({ message: "Faltan parámetros necesarios: idopcion, nombreopcion, url." });
            }

            const data = await RolOpcionesModel.PutRolOpcione(idopcion, nombreopcion, url, eliminado);

            console.log(`[INFO] - PutRolOpcione exitoso para idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PutRolOpcione para idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PutRolOpcione"
            });
        }
    }

    // Crear una nueva opción de rol
    static async PostRolOpcione(req, res) {
        const { nombreopcion, url } = req.body;  // Datos enviados en el cuerpo de la solicitud
        try {
            console.log(`[INFO] - Intento de PostRolOpcione recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Validar parámetros antes de proceder
            if (!nombreopcion || !url) {
                return res.status(400).send({ message: "Faltan parámetros necesarios: nombreopcion, url." });
            }

            const data = await RolOpcionesModel.PostRolOpcione(nombreopcion, url);

            console.log(`[INFO] - PostRolOpcione exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);  // Para crear un recurso, usas 201

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostRolOpcione. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PostRolOpcione"
            });
        }
    }
}
