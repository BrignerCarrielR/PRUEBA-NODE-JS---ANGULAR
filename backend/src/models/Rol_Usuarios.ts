import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../config/database';
import Usuario from "./Usuario";
import Rol from "./Rol";

class Rol_Usuarios extends Model {
}

Rol_Usuarios.init(
    {
        idrol: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Rol,
                key: 'idrol',
            },
            primaryKey: true,
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Usuario,
                key: 'idusuario',
            },
            primaryKey: true,
        },
        eliminado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'rol_usuarios',
        timestamps: false,
    }
);

// Relación con Usuario
Rol_Usuarios.belongsTo(Usuario, {
    foreignKey: 'idusuario', // Clave foránea en Rol_Usuarios
    as: 'usuario', // Alias para la relación
});
Usuario.hasMany(Rol_Usuarios, {
    foreignKey: 'idusuario',
    as: 'rol_usuarios',
});

// Relación con Rol
Rol_Usuarios.belongsTo(Rol, {
    foreignKey: 'idrol', // Clave foránea en Rol_Usuarios
    as: 'rol', // Alias para la relación
});
Rol.hasMany(Rol_Usuarios, {
    foreignKey: 'idrol',
    as: 'rol_usuarios',
});


export default Rol_Usuarios