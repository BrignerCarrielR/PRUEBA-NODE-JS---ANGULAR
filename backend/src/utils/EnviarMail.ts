import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function EnviarEmail(destinatario: string, asunto: string, mensaje: string) {

    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM } = process.env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_FROM) {
        throw new Error('Faltan variables de entorno necesarias.');
    }

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: EMAIL_PORT === '465', // usamos true `true` solo si el puerto es 465
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const opcionesCorreo = {
        from: EMAIL_FROM,
        to: destinatario,
        subject: asunto,
        html: mensaje,
    };

    try {
        await transporter.sendMail(opcionesCorreo);
        console.log(`Correo enviado a: ${destinatario}`);
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw error;
    }
}
