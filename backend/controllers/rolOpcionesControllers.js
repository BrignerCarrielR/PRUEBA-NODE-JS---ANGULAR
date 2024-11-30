// controllers/rolOpcionesController.js
import { RolOpcionesModel } from "../models/rolOpcionesModel.js";

export class RolOpcionesController {
    // Obtener todas las opciones de rol
    static async getRolOpciones(req, res) {
        try {
            const data = await RolOpcionesModel.getRolOpciones();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener las opciones de rol"
            });
        }
    }

    // Obtener una opción de rol por ID
    static async getIdRolOpciones(req, res) {
        try {
            const data = await RolOpcionesModel.getIdRolOpciones(req.params.id);
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: "Opción de rol no encontrada" });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener la opción de rol"
            });
        }
    }

    // Crear una nueva opción de rol
    static async postRolOpciones(req, res) {
        try {
            const { NombreOpcion } = req.body;

            // Validar que el nombre de la opción de rol sea válido
            if (typeof NombreOpcion !== "string" || NombreOpcion.trim() === "") {
                return res.status(400).send({ message: "El nombre de la opción de rol no es válido" });
            }

            const data = await RolOpcionesModel.postRolOpciones(NombreOpcion);
            res.status(201).send('Persona creada exitosamente'); // Opción de rol creada correctamente
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear la opción de rol"
            });
        }
    }

    // Actualizar una opción de rol
    static async putERolOpciones(req, res) {
        try {
            const { id } = req.params;
            const { NombreOpcion } = req.body;

            if (typeof NombreOpcion !== "string" || NombreOpcion.trim() === "") {
                return res.status(400).send({ message: "El nombre de la opción de rol no es válido" });
            }

            const result = await RolOpcionesModel.putERolOpciones(id, NombreOpcion);
            if (result > 0) {
                res.status(200).send({ message: "Opción de rol actualizada correctamente" });
            } else {
                res.status(404).send({ message: "Opción de rol no encontrada" });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar la opción de rol"
            });
        }
    }

    // Cambiar el estado de una opción de rol a 'Inactivo'
    static async putEstadoRolOpciones(req, res) {
        try {
            const { id } = req.params;
            const result = await RolOpcionesModel.putEstadoRolOpciones(id);
            if (result > 0) {
                res.status(200).send({ message: "Opción de rol desactivada correctamente" });
            } else {
                res.status(404).send({ message: "Opción de rol no encontrada" });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al cambiar el estado de la opción de rol"
            });
        }
    }
}
