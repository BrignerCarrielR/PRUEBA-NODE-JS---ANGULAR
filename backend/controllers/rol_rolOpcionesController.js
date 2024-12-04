import { RolRolOpcionesModel } from "../models/rol_rolOpcionesModel.js";

export class RolRolOpcionesController {
    // Obtener todas las asociaciones entre roles y opciones que no estén eliminadas
    static async GetRol_RolOpciones(req, res) {
        try {
            console.log(`[INFO] - Intento de GetRol_RolOpciones recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await RolRolOpcionesModel.GetRol_RolOpciones();

            console.log(`[INFO] - GetRol_RolOpciones exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);  // Cambié a 200 ya que es una consulta GET

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRol_RolOpciones. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRol_RolOpciones"
            });
        }
    }

    // Obtener una asociación específica entre rol y opción
    static async GetRol_RolOpcion(req, res) {
        const { idrol, idopcion } = req.params;  // Parámetros de rol y opción
        try {
            console.log(`[INFO] - Intento de GetRol_RolOpcion recibido para idrol: ${idrol}, idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await RolRolOpcionesModel.GetRol_RolOpcion(idrol, idopcion);

            if (!data) {
                console.log(`[INFO] - No se encontró la asociación entre rol y opción con idrol: ${idrol}, idopcion: ${idopcion}`);
                return res.status(404).send({ message: "Asociación rol-opción no encontrada" });
            }

            console.log(`[INFO] - GetRol_RolOpcion exitoso para idrol: ${idrol}, idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRol_RolOpcion para idrol: ${idrol}, idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRol_RolOpcion"
            });
        }
    }

    // Actualizar una asociación entre rol y opción
    static async PutRol_RolOpcion(req, res) {
        const { idrol, idopcion, eliminado } = req.body;  // Datos enviados en el cuerpo de la solicitud
        const { idrolOriginal, idopcionOriginal } = req.params;  // ID original de rol y opción para actualizar
        try {
            console.log(`[INFO] - Intento de PutRol_RolOpcion recibido para idrol: ${idrol}, idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Validar parámetros antes de proceder
            if (!idrol || !idopcion || idrolOriginal === undefined || idopcionOriginal === undefined) {
                return res.status(400).send({ message: "Faltan parámetros necesarios: idrol, idopcion, idrolOriginal, idopcionOriginal." });
            }

            const data = await RolRolOpcionesModel.PutRol_RolOpcion(idrol, idopcion, eliminado, idrolOriginal, idopcionOriginal);

            console.log(`[INFO] - PutRol_RolOpcion exitoso para idrol: ${idrol}, idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PutRol_RolOpcion para idrol: ${idrol}, idopcion: ${idopcion}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PutRol_RolOpcion"
            });
        }
    }

    // Crear una nueva asociación entre rol y opción
    static async PostRol_RolOpcion(req, res) {
        const { idrol, idopcion } = req.body;  // Datos enviados en el cuerpo de la solicitud
        try {
            console.log(`[INFO] - Intento de PostRol_RolOpcion recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Validar parámetros antes de proceder
            if (!idrol || !idopcion) {
                return res.status(400).send({ message: "Faltan parámetros necesarios: idrol, idopcion." });
            }

            const data = await RolRolOpcionesModel.PostRol_RolOpcion(idrol, idopcion);

            console.log(`[INFO] - PostRol_RolOpcion exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);  // Para crear un recurso, usas 201

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostRol_RolOpcion. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PostRol_RolOpcion"
            });
        }
    }
}
