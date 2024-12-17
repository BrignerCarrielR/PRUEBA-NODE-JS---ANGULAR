import {Request, Response} from 'express';

type AccionFunction = (...params: any[]) => Promise<any>;

async function gestionarSolicitudes(
    accion: AccionFunction,
    req: Request,
    res: Response,
): Promise<void> {
    try {
        console.log(`[INFO] - Intento recibido. Ruta: ${req.originalUrl}, Método: ${req.method}`);

        // Ejecutar la acción pasando los parámetros recibidos
        const data = await accion();

        console.log(`[INFO] - Intento exitoso. Ruta: ${req.originalUrl}, Método: ${req.method}`);
        res.status(200).send(data); // Responder con los datos obtenidos
    } catch (error: any) {
        console.error(`[ERROR] - Error al intentar hacer el Intento. Ruta: ${req.originalUrl}, Método: ${req.method}`);
        console.error(`[ERROR] - Detalles del error: ${error.message}`);

        res.status(500).send({
            message: error.message || `Error al procesar la solicitud el Intento`,
        });
    }
}

export {gestionarSolicitudes};
