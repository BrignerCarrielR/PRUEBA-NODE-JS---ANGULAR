import {RolRolOpcionesModel} from "../models/rolRolOpcionesModels.js";

export class RolRolOpcionesController {
    // Obtener todas las relaciones de rol y opciones
    static async getRolRolOpciones(req, res) {
        try {
            const data = await RolRolOpcionesModel.getRolRolOpciones();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener las relaciones de rol y opciones"
            });
        }
    }

    // Obtener una relación de rol y opción por idRol y idOpcion
    static async getIdRolRolOpciones(req, res) {
        try {
            const { idRol, idOpcion } = req.params;
            const data = await RolRolOpcionesModel.getIdRolRolOpciones(idRol, idOpcion);
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: "Relación de rol y opción no encontrada" });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener la relación de rol y opción"
            });
        }
    }

    // Crear una nueva relación de rol y opción
    static async postRolRolOpciones(req, res) {
        try {
            const { idRol, idOpcion } = req.body;

            // Validar que los IDs sean números enteros
            if (!Number.isInteger(idRol) || !Number.isInteger(idOpcion)) {
                return res.status(400).send({ message: "Los ID de rol y opción deben ser números enteros" });
            }

            const data = await RolRolOpcionesModel.postRolRolOpciones(idRol, idOpcion);
            res.status(201).send(data); // Relación de rol y opción creada correctamente
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear la relación de rol y opción"
            });
        }
    }

    // Actualizar una relación de rol y opción
    static async putERolRolOpciones(req, res) {
        try {
            const { idRol, idOpcion } = req.body;
            const { oldIdRol, oldIdOpcion } = req.params;

            if (!Number.isInteger(idRol) || !Number.isInteger(idOpcion)) {
                return res.status(400).send({ message: "Los ID de rol y opción deben ser números enteros" });
            }

            const result = await RolRolOpcionesModel.putERolRolOpciones(idRol, idOpcion, oldIdRol, oldIdOpcion);
            if (result > 0) {
                res.status(200).send({ message: "Relación de rol y opción actualizada correctamente" });
            } else {
                res.status(404).send({ message: "Relación de rol y opción no encontrada" });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar la relación de rol y opción"
            });
        }
    }

    // Cambiar el estado de una relación de rol y opción a 'Inactivo'
    static async putEstadoRolRolOpciones(req, res) {
        try {
            const { idRol, idOpcion } = req.params;
            const result = await RolRolOpcionesModel.putEstadoRolRolOpciones(idRol, idOpcion);
            if (result > 0) {
                res.status(200).send({ message: "Relación de rol y opción desactivada correctamente" });
            } else {
                res.status(404).send({ message: "Relación de rol y opción no encontrada" });
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al cambiar el estado de la relación de rol y opción"
            });
        }
    }
}
