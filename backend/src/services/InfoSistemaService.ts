import {queries} from "../config/queries";
import {sequelize} from "../config/database";
import {QueryTypes} from 'sequelize';


export class InfoSistemaService {
    async DatosBienvenida(id: number): Promise<any> {
        try {
            const datos = await sequelize.query(queries.getDatosB, {
                replacements: {id},
                type: QueryTypes.SELECT
            });

            return datos[0] || null; // Retorna el primer resultado o null si está vacío
        } catch (error: any) {
            throw new Error(`Error al obtener datos de bienvenida para el ID ${id}: ${error.message}`);
        }
    }

    async DatosDashboard(): Promise<any> {
        try {
            const datos = await sequelize.query(queries.getDashboard, {
                replacements: {},
                type: QueryTypes.SELECT
            })
            return datos[0] || null;
        } catch (error: any) {
            throw new Error(`Error al obtener datos del dashboard: ${error.message}`);
        }
    }

    async MenuUsuario(id: number): Promise<any> {
        try {
            const datos = await sequelize.query(queries.getMemuUsuario, {
                replacements: {idusuario: id},
                type: QueryTypes.SELECT
            })
            return datos || null;
        } catch (error: any) {
            throw new Error(`Error al obtener datos del menu: ${error.message}`);
        }
    }
}
