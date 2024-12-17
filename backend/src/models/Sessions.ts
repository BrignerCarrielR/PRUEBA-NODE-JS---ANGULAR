import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database";
import Usuario from "./Usuario";

class Sessions extends Model {
}

Sessions.init(
    {
        fechaingreso: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fechacierre: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Usuario, //referenciamos al modelo Usuario
                key: 'idusuario',
            },
            primaryKey: true,
        }
    },
    {
        sequelize,
        modelName: "sessions",
        timestamps: false,
    }
);

// Definimos la asociacion con el modelo Usuario
Sessions.belongsTo(Usuario, {
    foreignKey: 'idusuario',
    as: 'sessions', // alias para la realcion
})

Usuario.hasMany(Sessions, {
    foreignKey: 'idusuario',
    as: 'usuarios', // alias para la relacion inversa
})

export default Sessions;