import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import personaRouter from "./routes/PersonaRouter";
import infoSistemaRouter from "./routes/InfoSistemaRouter";
import usuarioRouter from "./routes/UsuarioRouter";
import authRouter from "./routes/AuthRouter";



dotenv.config();

const app = express();
app.use(express.json());

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// configuracion de los permisos
app.use(cors({
    origin: 'http://localhost:4200',  // Permite solicitudes desde este dominio
    methods: ['GET', 'POST', 'PUT'],  // Métodos permitidos
}));

app.get("/api", (_req:express.Request, res:express.Response) => {
    res.send('<h1>Proyecto en PostgreSQL, NodeJS y AngularCLI</h1>');
});

app.use('/api/auth', authRouter);
app.use('/api/personas', personaRouter);
app.use('/api/infoSistema', infoSistemaRouter);
app.use('/api/usuarios', usuarioRouter);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}/api/`);
})