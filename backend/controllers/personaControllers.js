import {PersonaModel} from "../models/personaModel.js";

export class PersonaController {
    // Obtener todas las personas activas
    static async getPersonas(req, res) {
        try {
            const data = await PersonaModel.getPersonas();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener las personas"
            });
        }
    }

    // Obtener una persona en particular
    static async getPersona(req, res) {
        try {
            const data = await PersonaModel.getPersona(req.params.id);
            if (!data) {
                return res.status(404).send({ message: "Persona no encontrada" });
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener la persona"
            });
        }
    }

    // Insertar una nueva persona
    static async insertPersona(req, res) {
        try {
            const { Nombres, Apellidos, Identificacion, FechaNacimiento } = req.body;

            // Validar que los campos no estén vacíos
            if (!Nombres || !Apellidos || !Identificacion || !FechaNacimiento) {
                return res.status(400).send({ message: "Faltan campos obligatorios" });
            }

            const data = await PersonaModel.createPersona(req.body);
            res.status(201).send({
                message: "Persona creada exitosamente",
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al insertar la persona"
            });
        }
    }

    // Actualizar la información de una persona
    static async updatePersona(req, res) {
        try {
            const { Nombres, Apellidos, Identificacion, FechaNacimiento } = req.body;

            // Validar que los campos no estén vacíos
            if (!Nombres || !Apellidos || !Identificacion || !FechaNacimiento) {
                return res.status(400).send({ message: "Faltan campos obligatorios" });
            }

            const data = await PersonaModel.updatePersona(req.params.id, req.body);
            if (!data) {
                return res.status(404).send({ message: "Persona no encontrada" });
            }

            res.status(200).send({
                message: "Persona actualizada exitosamente",
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar la persona"
            });
        }
    }

    // Desactivar una persona (cambiar el estado a 'I')
    static async deactivatePersona(req, res) {
        try {
            const data = await PersonaModel.deactivatePersona(req.params.id);
            if (!data) {
                return res.status(404).send({ message: "Persona no encontrada" });
            }

            res.status(200).send({
                message: "Persona desactivada exitosamente",
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al desactivar la persona"
            });
        }
    }
}
