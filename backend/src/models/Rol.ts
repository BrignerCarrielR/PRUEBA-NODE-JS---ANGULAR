import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../config/database';

class Rol extends Model {}

Rol.init(
    {
        idrol: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rolname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'rol',
        timestamps: false,
    }
);


export default Rol;