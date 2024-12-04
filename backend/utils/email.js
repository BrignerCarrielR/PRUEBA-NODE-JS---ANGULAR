import nodemailer from 'nodemailer';

export async function sendEmail(destinatario, asunto, mensaje) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'bcarrielr@unemi.edu.ec',
            pass: 'dylan2002@'
        }
    });

    const opcionesCorreo = {
        from: '"Sistema Usuario - Brigner" <tu-correo@gmail.com>',
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
