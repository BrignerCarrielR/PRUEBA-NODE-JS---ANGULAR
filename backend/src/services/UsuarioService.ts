import {UsuarioRepository} from "../repositories/UsuarioRepository";

import Usuario from "../models/Usuario";
import {sequelize} from "../config/database";
import {queries} from "../config/queries";
import {QueryTypes} from "sequelize";


type UsuarioCall = {
    nombres: string;
    apellidos: string;
    identificacion: string;
    username: string;
    password: string;
}

type Resultado = {
    usuario: string;
    mensaje: string;
}

type resultadoConsulta = {
    crear_usuario_con_validaciones: string
}


export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async listarUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.getUsuarios()
    }

    async usuarioId(id: number): Promise<any> {
        const usuario = await this.usuarioRepository.ObtenerUsuario(id);

        if (!usuario) {
            throw new Error('No se encontro el usuario.')
        }

        return {
            nombres: usuario.persona.nombres,
            apellidos: usuario.persona.apellidos,
            username: usuario.username,
            mail: usuario.mail,
        }
    }

    async listarUsuarioAdmin(): Promise<any> {
        // Obtenemos la lista de usuarios con la estructura de la consulta
        const usuarios = await this.usuarioRepository.ObtenerUsuarioAdmin();

        if (!usuarios || usuarios.length === 0) {
            throw new Error('No se encontraron usuarios.');
        }

        // le damos formato a la respuesta para que coincida con la estructura esperada
        return usuarios.map((usuario: any) => {
            const persona = usuario.persona;

            // verificamos si el tiene un rol y escojemos el primero, en caso contrario le definimos null
            const rol = usuario.rol_usuarios.length > 0 ? usuario.rol_usuarios[0].rol.rolname : null;

            return {
                idusuario: usuario.idusuario,
                nombres: persona.nombres,
                apellidos: persona.apellidos,
                username: usuario.username,
                mail: usuario.mail,
                rolname: rol,
                status: usuario.status,
            };
        });
    }

    async editarUsuario(id: number, nombres: string, apellidos: string, username: string, mail: string): Promise<any> {
        try {
            await sequelize.query(queries.putUsuario, {
                replacements: {id, nombres, apellidos, username, mail},
                type: QueryTypes.RAW
            })
            return {message: `El usuario ${nombres} se actualizó correctamente.`}
        } catch (error: any) {
            throw new Error(`Error al editar usuario: ${error.message}`);
        }
    }

    async editarUsuarioStatus(id: number, status: string): Promise<any> {
        try {
            return await this.usuarioRepository.editarUsuarioStatus(id, status);
        } catch (error: any) {
            throw new Error(`Error al editar usuario: ${error.message}`);
        }
    }


    // realizar el endpoint para ejecutar el procedimiento del crear al usuario

    async crearUsuario(nombres: string, apellidos: string, identificacion: string, username: string, password: string): Promise<any> {
        try {
            return await sequelize.query(queries.postUsario, {
                replacements: {nombres, apellidos, identificacion, username, password},
                type: QueryTypes.SELECT
            });
        } catch (error: any) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }

    async crearUsuarios(usuarios: UsuarioCall[]) {
        try {
            const resultados: Resultado[] = [];
            console.log(usuarios)

            for (const usuario of usuarios) {
                console.log(`Procesando usuario: ${usuario.nombres}`);

                const resultado = await sequelize.query<resultadoConsulta>(queries.postUsario, {
                    replacements: {
                        nombres: usuario.nombres,
                        apellidos: usuario.apellidos,
                        identificacion: usuario.identificacion,
                        username: usuario.username,
                        password: usuario.password
                    },
                    type: QueryTypes.SELECT
                });

                console.log(resultado[0].crear_usuario_con_validaciones)

                // agregamos el mensaje devuelto por la consulta y la guardamos en la lista
                const mensaje: string = resultado[0].crear_usuario_con_validaciones || `Usuario ${usuario.username} procesado sin mensaje.`;
                resultados.push({usuario: usuario.username, mensaje});

            }
            console.log({resultados});

            // retornamos todos los resultados
            return {resultados};
        } catch (error: any) {
            console.log(usuarios)
            console.error('Error procesando usuarios:', error);
            return {resultados: []};
        }
    }

}