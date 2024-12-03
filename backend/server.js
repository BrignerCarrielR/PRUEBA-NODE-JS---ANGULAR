import express from 'express';
import cors from 'cors';

import LoginRoute from "./routers/loginRoute.js";
import InfoSistemaRouter from "./routers/infoSistemaRoute.js";
import UsuarioRouter from "./routers/usuarioRoute.js";

const app = express();

// Iniciar el servidor
const host = 'localhost';
const port = 3000;

// CORS configuration
app.use(cors({
    origin: 'http://localhost:4200',  // Permite solicitudes desde este dominio
    methods: ['GET', 'POST', 'PUT'],  // Métodos permitidos
}));

// Configurar el tamaño máximo del cuerpo de la solicitud
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', LoginRoute);
app.use('/api', InfoSistemaRouter);
app.use('/api', UsuarioRouter);


// Ruta de prueba
app.get('/api/inicio', (req, res) => {  // Asegúrate de usar '/inicio' como ruta válida
    res.send('<h1>Proyecto en PostgreSQL, NodeJS y AngularCLI</h1>');
});

// Iniciar el servidor
app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}/api/inicio`);

});
