import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const database: string = process.env.DB_DATABASE!;
const user: string = process.env.DB_USER!;
const password: string = process.env.DB_PASSWORD!;
const host: string = process.env.DB_HOST!;

// asegurarnos que las variables de entorno estan definidas
if (!database || !user || !password || !host) {
    throw new Error('Faltan variables de entorno.');
}
// configuracion de la conexion a la base de datos
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'postgres',
    logging: false, // es para visualizar las consultas en formato SQL
});

export { sequelize };
