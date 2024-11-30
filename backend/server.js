import express from 'express';
import cors from 'cors';

import routerPersona from "./routers/personaRoutes.js";
import routerRolOpciones from "./routers/rolOpcionesRoutes.js";
import routerRolRolOpciones from "./routers/rolRolOpcionesRoutes.js";
import routerUsuario from "./routers/usuarioRoutes.js";
import routerRol from "./routers/rolRoutes.js";
import routerRolUsuario from "./routers/rolUsuarioRoutes.js";
import routerSesion from "./routers/sesionRoutes.js";

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
app.use(express.json({ limit: '10mb' }));  // Aplica un límite de 10 MB para el cuerpo de la solicitud
app.use(express.urlencoded({ limit: '10mb', extended: true }));  // También configura el límite para formularios codificados en URL

// Usar las rutas de persona con prefijo '/api'
app.use('/api/personas', routerPersona);
app.use('/api/rol_opciones', routerRolOpciones);
app.use('/api/rol_rol_opciones', routerRolRolOpciones);
app.use('/api', routerUsuario);
app.use('/api/rol', routerRol);
app.use('/api/rolUsuarios', routerRolUsuario);
app.use('/api/sesion', routerSesion);


// Ruta de prueba
app.get('/api/inicio', (req, res) => {  // Asegúrate de usar '/inicio' como ruta válida
    res.send('<h1>Proyecto en PostgreSQL, NodeJS y AngularCLI</h1>');
});

// Iniciar el servidor
app.listen(port, host, () => {
    console.log(`Servidor corriendo en http://${host}:${port}/api`);
});
