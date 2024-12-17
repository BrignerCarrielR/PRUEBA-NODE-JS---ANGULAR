import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../config/database';

class Persona extends Model {
}

Persona.init(
    {
        idpersona: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        identificacion: {
            type: DataTypes.STRING(12),
            allowNull: false,
            unique: true,
        },
        fechanacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'persona',
        timestamps: false, // Desactiva createdAt y updatedAt
    }
);

export default Persona;
