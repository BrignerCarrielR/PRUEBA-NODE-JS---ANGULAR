import {AuthRepository} from "../repositories/AuthRepository";
import {UsuarioRepository} from "../repositories/UsuarioRepository";
import {EnviarEmail} from "../utils/EnviarMail";

export class AuthService {
    private authRepository: AuthRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.authRepository = new AuthRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    async login(usernameORmail: string, password: string): Promise<any> {

        try {
            const usuario = await this.authRepository.UsuarioCorreo(usernameORmail);

            if (!usuario) {
                return {message: 'No se encontro el usuario.'}
            }
            if (usuario.status === 'Inactivo') {
                return {message: 'El usuario está Inactivo.'}
            }
            if (usuario.status === 'Bloqueado') {
                return {message: 'El usuario está bloqueado.'}
            }
            console.log(usuario.rol_usuarios[0].rol.rolname);// obtenemos el el rol

            console.log(password);

            // validamos la contreaseña, la contraseña ingresada debe ser igual a la obtenida
            if (password !== usuario.password) {
                await this.authRepository.ActualizarIntentos(usuario.idusuario);
                return {message: `Contraseña incorrecta. Intentos restantes: ${2 - usuario.failedattempts}`}
            }

            await this.authRepository.ResetearIntentos(usuario.idusuario);// reseteamos en caso sean correctos las credenciales

            // verificamos si ya hay sesión activa
            if (usuario.sessionactive === "S") {
                return {
                    message: "El usuario ya tiene una sesión activa.",
                    iduser: usuario.idusuario, usuario: usuario.username, rol: usuario.rol_usuarios[0].rol.rolname
                };
            }

            await this.authRepository.CreaSession(usuario.idusuario);
            await this.authRepository.EditarEstadoActivo(usuario.idusuario);


            return {
                message: "Inicio de sesión exitoso.",
                iduser: usuario.idusuario, usuario: usuario.username, rol: usuario.rol_usuarios[0].rol.rolname
            };
        } catch (error: any) {
            throw new Error(`Error al cerrar la sesion: ${error.message}`);
        }
    }


    async logout(id: number): Promise<any> {
        try {
            const resultadoSession = await this.authRepository.ObtenerSesionActiva(id);
            if (resultadoSession.sessionactive !== "S") {
                return {message: "No hay una sesión activa para este usuario."}
            }

            await this.authRepository.EditarEstadoInactivo(id);
            await this.authRepository.EditarSession(id);

            return {message: "Cierre de sesión exitoso."};
        } catch (error: any) {
            throw new Error(`Error al cerrar la sesion: ${error.message}`);
        }

    }


    async RecuerarContrasena(nombres: string, apellidos: string, username: string, mail: string): Promise<any> {
        try {
            const usuario = await this.usuarioRepository.obtenerUsuarioPorDatos(nombres, apellidos, username, mail);
            await EnviarEmail(usuario.mail, "Recuperación de contraseña", `Tu contraseña es: ${usuario.password}`)

            return {message: "Correo de recuperación enviado con la contraseña."};
        } catch (error: any) {
            throw new Error(`Error al enviar el correo: ${error.message}`);
        }
    }
}