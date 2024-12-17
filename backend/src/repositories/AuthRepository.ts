import Usuario from "../models/Usuario";
import Rol_Usuarios from "../models/Rol_Usuarios";
import Rol from "../models/Rol";

import {Op} from 'sequelize';
import Sessions from "../models/Sessions";

// para usar opradores logicos como and  y or, etc

export class AuthRepository {
    async UsuarioCorreo(usernameORmail: string): Promise<any> {
        return await Usuario.findOne({
            where: {
                [Op.or]: [ // Utiliza el operador OR
                    {username: usernameORmail}, // Condición 1: username igual a `username`
                    {mail: usernameORmail}      // Condición 2: mail igual a `mail`
                ]
            },
            attributes: ['idusuario', 'username', 'password', 'status', 'sessionactive', 'failedattempts'],
            include: [
                {
                    model: Rol_Usuarios,
                    as: "rol_usuarios",
                    attributes: ['idusuario'],
                    include: [{
                        model: Rol,
                        as: 'rol',
                        attributes: ['rolname'],
                    }]
                }
            ]
        })
    }

    async ActualizarIntentos(id: Number): Promise<Usuario> {
        const usuario = await Usuario.findOne({where: {idusuario: id}})
        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }
        await usuario.update({failedattempts: usuario.failedattempts + 1})

        return usuario;
    }

    async ResetearIntentos(id: Number): Promise<Usuario> {
        const usuario = await Usuario.findOne({where: {idusuario: id}})
        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }
        await usuario.update({failedattempts: 0})

        return usuario;
    }

    async CreaSession(id: number): Promise<Sessions> {
        try {
            const fechaEcuador = new Date();
            const datosSession = {
                fechaingreso: fechaEcuador.setHours(fechaEcuador.getHours() - 5),
                fechacierre: null,
                idusuario: id
            }
            const sessions = Sessions.build(datosSession)
            await sessions.save()
            return sessions

        } catch (error: any) {
            throw new Error(`Error al guardar la session: ${error.message}`);
        }

    }

    async EditarEstadoActivo(id: number): Promise<any> {
        const usuario = await Usuario.findOne({where: {idusuario: id}})
        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }
        await usuario.update({sessionactive: 'S'})

        return usuario;
    }

    async ObtenerSesionActiva(id: number): Promise<any> {
        const usuario = await Usuario.findOne({
            where: {idusuario: id},
            attributes: ['sessionactive']
        })
        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }
        return usuario
    }

    async EditarEstadoInactivo(id: number): Promise<any> {
        const usuario = await Usuario.findOne({where: {idusuario: id}})
        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }
        await usuario.update({sessionactive: 'N'})

        return usuario;
    }

    async EditarSession(id: number): Promise<any> {
        const session = await Sessions.findOne({where: {idusuario: id, fechacierre: null}})
        if (!session) {
            throw new Error('No se encontro el usuario.')
        }
        const fechaEcuador = new Date();
        await session.update({fechacierre: fechaEcuador.setHours(fechaEcuador.getHours() - 5)})

        return session;
    }
}