import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

// cargamos las variables de entorno desde el earchivo .env
dotenv.config();

// configuracion del pool para la conexion  con la base de datos
const pool = new Pool({
    user: process.env.DB_USER ,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// verificamos la conexion
pool.connect()
    .then(() => {
        console.log('Conectado al pool de la base de datos');
    })
    .catch(err => {
        console.log('Error de conexión: ', err);
    });

export default pool;