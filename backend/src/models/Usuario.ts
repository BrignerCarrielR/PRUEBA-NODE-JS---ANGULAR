import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../config/database';
import Persona from './Persona';

class Usuario extends Model {
    public idusuario!: number;
    public username!: string;
    public password!: string;
    public mail!: string;
    public status!: string;
    public sessionactive!: string;
    public persona_idpersona!: number;
    public failedattempts!: number;
}

Usuario.init(
    {
        idusuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING(120),
            allowNull: true,
        },
        sessionactive: {
            type: DataTypes.CHAR(1),
            allowNull: true,
        },
        persona_idpersona: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Persona, // Referencia al modelo Persona
                key: 'idpersona', // clave foránea correcta
            },
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        failedattempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'usuarios',
        timestamps: false, // Desactiva createdAt y updatedAt
    }
);

// Relación con Persona
Usuario.belongsTo(Persona, {
    foreignKey: 'persona_idpersona', // Clave foranea en Usuario
    as: 'persona', // Alias para la relación
});

// Relación inversa (Persona tiene muchos Usuarios)
Persona.hasMany(Usuario, {
    foreignKey: 'persona_idpersona', // Clave foranea en Usuario
    as: 'usuarios', // Alias para la relación inversa
});


export default Usuario;
