import { RolUsuariosModel } from "../models/rol_UsuariosModel.js";

export class RolUsuariosController {
    // Obtener todas las asociaciones entre rol y usuario que no están eliminadas
    static async GetRol_Usuarios(req, res) {
        try {
            console.log(`[INFO] - Intento de GetRol_Usuarios recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Procesamos la solicitud
            const data = await RolUsuariosModel.GetRol_Usuarios();

            console.log(`[INFO] - GetRol_Usuarios exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);  // Cambié a 200 ya que es una consulta GET

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRol_Usuarios. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRol_Usuarios"
            });
        }
    }

    // Obtener una asociación específica entre rol y usuario
    static async GetRol_Usuario(req, res) {
        const { idrol, idusuario } = req.params;  // Parámetros de rol y usuario
        try {
            console.log(`[INFO] - Intento de GetRol_Usuario recibido para idrol: ${idrol}, idusuario: ${idusuario}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await RolUsuariosModel.GetRol_Usuario(idrol, idusuario);

            if (!data) {
                console.log(`[INFO] - No se encontró la asociación entre rol y usuario con idrol: ${idrol}, idusuario: ${idusuario}`);
                return res.status(404).send({ message: "Asociación rol-usuario no encontrada" });
            }

            console.log(`[INFO] - GetRol_Usuario exitoso para idrol: ${idrol}, idusuario: ${idusuario}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer GetRol_Usuario para idrol: ${idrol}, idusuario: ${idusuario}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de GetRol_Usuario"
            });
        }
    }

    // Actualizar una asociación entre rol y usuario
    static async PutRol_Usuario(req, res) {
        const { idrol, idusuario, eliminado } = req.body;  // Datos enviados en el cuerpo de la solicitud
        const { idrolOriginal, idusuarioOriginal } = req.params;  // ID original de rol y usuario para actualizar
        try {
            console.log(`[INFO] - Intento de PutRol_Usuario recibido para idrol: ${idrol}, idusuario: ${idusuario}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Validar parámetros antes de proceder
            if (!idrol || !idusuario || idrolOriginal === undefined || idusuarioOriginal === undefined) {
                return res.status(400).send({ message: "Faltan parámetros necesarios: idrol, idusuario, idrolOriginal, idusuarioOriginal." });
            }

            const data = await RolUsuariosModel.PutRol_Usuario(idrol, idusuario, eliminado, idrolOriginal, idusuarioOriginal);

            console.log(`[INFO] - PutRol_Usuario exitoso para idrol: ${idrol}, idusuario: ${idusuario}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(200).send(data);

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PutRol_Usuario para idrol: ${idrol}, idusuario: ${idusuario}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PutRol_Usuario"
            });
        }
    }

    // Crear una nueva asociación entre rol y usuario
    static async PostRol_Usuario(req, res) {
        const { idrol, idusuario } = req.body;  // Datos enviados en el cuerpo de la solicitud
        try {
            console.log(`[INFO] - Intento de PostRol_Usuario recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            // Validar parámetros antes de proceder
            if (!idrol || !idusuario) {
                return res.status(400).send({ message: "Faltan parámetros necesarios: idrol, idusuario." });
            }

            const data = await RolUsuariosModel.PostRol_Usuario(idrol, idusuario);

            console.log(`[INFO] - PostRol_Usuario exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send(data);  // Para crear un recurso, usamos 201

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer PostRol_Usuario. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de PostRol_Usuario"
            });
        }
    }
}
