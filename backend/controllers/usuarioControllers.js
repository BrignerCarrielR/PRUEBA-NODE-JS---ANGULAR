import {UsuariosModel} from "../models/usuarioModel.js";

// funcion para generar el correo electronico
function generarCorreo(nombres, apellidos, usuariosExistentes) {
    let correoBase = `${nombres.split(' ')[0].toLowerCase()}${apellidos.split(' ')[0].toLowerCase()}@mail.com`;
    let correoFinal = correoBase;
    let contador = 1;

    // Verificar si el correo ya existe
    while (usuariosExistentes.includes(correoFinal)) {
        correoFinal = `${nombres.split(' ')[0].toLowerCase()}${apellidos.split(' ')[0].toLowerCase()}${contador}@mail.com`;
        contador++;
    }

    return correoFinal;
}
// funcion para validar el username
function validarUserName(userName) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!regex.test(userName)) {
        throw new Error("El nombre de usuario debe tener al menos 1 número, 1 letra mayúscula, sin signos, y debe tener entre 8 y 20 caracteres.");
    }
}
// funcion para validar el password
function validarPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/;
    if (!regex.test(password)) {
        throw new Error("La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, un signo y no debe contener espacios.");
    }
}
// funcion para validar el el numero de indentificacion
function validarIdentificacion(identificacion) {
    if (!/^\d{10}$/.test(identificacion)) {
        throw new Error("La identificación debe tener 10 dígitos y solo números.");
    }
    if (/(\d)\1{3}/.test(identificacion)) {
        throw new Error("La identificación no debe contener 4 números consecutivos repetidos.");
    }
}



export class UsuariosController {
    // Obtener todos los usuarios
    static async getUsuarios(req, res) {
        try {
            const data = await UsuariosModel.getUsuarios();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los usuarios"
            });
        }
    }

    // Obtener un usuario por ID
    static async getUsuario(req, res) {
        try {
            const data = await UsuariosModel.getUsuarioById(req.params.id);
            if (!data) {
                return res.status(404).send({
                    message: "Usuario no encontrado"
                });
            }
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el usuario"
            });
        }
    }

    // Crear un nuevo usuario
    static async insertUsuario(req, res) {
        try {
            const data = await UsuariosModel.postUsuario(req.body);
            res.status(201).send({
                message: "Usuario creado exitosamente",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear el usuario"
            });
        }
    }

    // Actualizar un usuario
    static async putUsuario(req, res) {
        try {
            const data = await UsuariosModel.putUsuario(req.params.id, req.body);
            res.status(200).send({
                message: "Usuario actualizado con éxito",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el usuario"
            });
        }
    }

    // Cambiar el estado de un usuario
    static async putEstadoUsuario(req, res) {
        try {
            const data = await UsuariosModel.putEstadoUsuario(req.params.id);
            res.status(200).send({
                message: "Estado del usuario actualizado con éxito",
                data
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el estado del usuario"
            });
        }
    }


    // Crear un nuevo usuario
    static async Login(req, res) {
        try {
            const data = await UsuariosModel.login(req.body);
            res.status(201).send({data});
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear el usuario"
            });
        }
    }

    static async Logout(req, res) {
        try {
            const data = await UsuariosModel.logout(req.params.id);
            res.status(201).send({data});
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al crear el usuario"
            });
        }
    }
}
