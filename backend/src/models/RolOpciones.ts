import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database";

class RolOpciones extends Model {
}

RolOpciones.init(
    {
        idopcion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreopcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "rolopciones",
        timestamps: false,
    }
)

export default RolOpciones;