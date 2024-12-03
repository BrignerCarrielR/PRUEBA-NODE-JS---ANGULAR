import {LoginModel} from "../models/loginModel.js";

export class LoginController {
    static async Login(req, res) {
        const { username, password } = req.body;
        try {
            console.log(`[INFO] - Intento de login recibido para el usuario: ${username}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await LoginModel.Login(username, password);

            console.log(`[INFO] - Login exitoso para el usuario: ${username}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send( data );

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer login para el usuario: ${username}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de login"
            });
        }
    }

    static async Logout(req, res) {
        try {
            console.log(`[INFO] - Intento de Logout recibido para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);

            const data = await LoginModel.Logout(req.params.id);

            console.log(`[INFO] - Logout exitoso para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            res.status(201).send( data );

        } catch (error) {
            console.error(`[ERROR] - Error al intentar hacer Logout para el usuario: ${req.params.id}. Ruta: ${req.originalUrl}, Método: ${req.method}`);
            console.error(`[ERROR] - Detalles del error: ${error.message}`);

            res.status(500).send({
                message: error.message || "Error al procesar la solicitud de Logout"
            });
        }
    }

}
