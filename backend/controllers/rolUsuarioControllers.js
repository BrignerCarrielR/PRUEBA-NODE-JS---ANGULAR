// controllers/rolUsuariosController.js
import { RolUsuariosModel } from "../models/rolUsuarioModels.js";

export class RolUsuariosController {
    // Obtener todos los roles de usuarios
    static async getRolUsuarios(req, res) {
        try {
            const data = await RolUsuariosModel.getRolUsuarios();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los roles de usuarios"
            });
        }
    }

    // Obtener un rol de usuario por ID de rol y usuario
    static async getRolUsuario(req, res) {
        try {
            const { idRol, idUsuario } = req.params;
            const data = await RolUsuariosModel.getRolUsuarioById(idRol, idUsuario);
            if (!data) {
                return res.status(404).send({
                    message: "Rol de usuario no encontrado"
                });
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el rol de usuario"
            });
        }
    }

    // Insertar un nuevo rol de usuario
    static async insertRolUsuario(req, res) {
        try {
            const { idRol, idUsuario } = req.body;

            // Validación de los campos
            if (!idRol || !idUsuario) {
                return res.status(400).send({ message: "Los campos idRol e idUsuario son obligatorios" });
            }

            const data = await RolUsuariosModel.postRolUsuario(req.body);
            res.status(201).send({
                message: "Rol de usuario creado exitosamente",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear el rol de usuario"
            });
        }
    }

    // Actualizar un rol de usuario
    static async putRolUsuario(req, res) {
        try {
            const { idRol, idUsuario } = req.params;
            const data = await RolUsuariosModel.putRolUsuario(idRol, idUsuario, req.body);
            res.status(200).send({
                message: "Rol de usuario actualizado con éxito",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el rol de usuario"
            });
        }
    }

    // Cambiar el estado de un rol de usuario
    static async putEstadoRolUsuario(req, res) {
        try {
            const { idRol, idUsuario } = req.params;
            const data = await RolUsuariosModel.putEstadoRolUsuario(idRol, idUsuario);
            res.status(200).send({
                message: "Estado del rol de usuario actualizado con éxito",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el estado del rol de usuario"
            });
        }
    }
}
