import {DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database";
import RolOpciones from "./RolOpciones";
import Rol from "./Rol";

class Rol_RolOpciones extends Model {}

Rol_RolOpciones.init(
    {
        idrol:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Rol,
                key: 'idrol',
            },
            primaryKey: true,
        },
        idopcion:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: RolOpciones,
                key: 'idopcion',
            },
            primaryKey: true,
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "rol_rolopciones",
        timestamps: false,
    }
)

// definir realacion con el modelo ROL
Rol_RolOpciones.belongsTo(Rol, {
    foreignKey: 'idrol',
    as: 'rol',
})

Rol.hasMany(Rol_RolOpciones,{
    foreignKey: 'idrol',
    as: 'rol_rolopciones',
})

// definir relacion con  el modelo RolOpciones
Rol_RolOpciones.belongsTo(RolOpciones, {
    foreignKey: 'idopcion',
    as:'rolopciones',
})

RolOpciones.hasMany(Rol, {
    foreignKey: 'idopcion',
    as: 'rol_rolopciones',
})

export default Rol_RolOpciones;