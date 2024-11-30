// controllers/rolController.js
import { RolModel } from "../models/rolModels.js";

export class RolController {
    // Obtener todos los roles
    static async getRoles(req, res) {
        try {
            const data = await RolModel.getRoles();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los roles"
            });
        }
    }

    // Obtener un rol por ID
    static async getRol(req, res) {
        try {
            const data = await RolModel.getRolById(req.params.id);
            if (!data) {
                return res.status(404).send({
                    message: "Rol no encontrado"
                });
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el rol"
            });
        }
    }

    // Crear un nuevo rol
    static async insertRol(req, res) {
        try {
            const { RolName } = req.body;

            // Validación de los campos
            if (!RolName || RolName.trim() === "") {
                return res.status(400).send({ message: "El nombre del rol es obligatorio" });
            }

            const data = await RolModel.postRol(req.body);
            res.status(201).send({
                message: "Rol creado exitosamente",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear el rol"
            });
        }
    }

    // Actualizar un rol
    static async putRol(req, res) {
        try {
            const data = await RolModel.putRol(req.params.id, req.body);
            res.status(200).send({
                message: "Rol actualizado con éxito",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el rol"
            });
        }
    }

    // Cambiar el estado de un rol (activar/desactivar)
    static async putEstadoRol(req, res) {
        try {
            const data = await RolModel.putEstadoRol(req.params.id);
            res.status(200).send({
                message: "Estado del rol actualizado con éxito",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el estado del rol"
            });
        }
    }
}
