import Usuario from "../models/Usuario";
import Persona from "../models/Persona";
import Rol_Usuarios from "../models/Rol_Usuarios";
import Rol from "../models/Rol";


export class UsuarioRepository {

    async getUsuarios(): Promise<Usuario[]> {
        return await Usuario.findAll()
    }

    async ObtenerUsuario(id: number): Promise<any> {
        try {
            return await Usuario.findOne({
                where: {idusuario: id},
                include: {
                    model: Persona,
                    as: 'persona', // es como se definió la relacion
                    attributes: ['nombres', 'apellidos'], // Los campos de Persona que deseas obtener
                },
                attributes: ['username', 'mail'],
            })
        } catch (error) {
            throw error
        }
    }

    async ObtenerUsuarioAdmin(): Promise<any> {
        try {
            return await Usuario.findAll({
                attributes: [
                    'idusuario',        // idusuario
                    'username',         // UserName
                    'mail',             // Mail
                    'status',           // Status
                ],
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                        attributes: ['nombres', 'apellidos'],
                        required: false,
                    },
                    {
                        model: Rol_Usuarios,
                        as: 'rol_usuarios',
                        attributes: ['idusuario'],
                        include: [
                            {
                                model: Rol,
                                as: 'rol',
                                attributes: ['rolname'],
                            }
                        ]
                    },
                ],
            });

        } catch (error) {
            throw error;
        }
    }

    async editarUsuarioStatus(id: number, status: string): Promise<any> {
        const usuario = await Usuario.findOne({where: {idusuario: id}})

        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }
        await usuario.update({status})

        return usuario;
    }

    async obtenerUsuarioPorDatos(nombres: string, apellidos: string, username: string, mail: string): Promise<any> {
        return await Usuario.findOne({
            where: {username, mail},
            attributes: ['password','username', 'mail'],
            include: [
                {
                    model: Persona,
                    as: "persona",
                    where: {nombres, apellidos}
                }
            ]
        })
    }
}


