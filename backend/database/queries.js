export const queries = {
    // Tabla Persona
    getPersonas: `SELECT idPersona, Nombres, Apellidos, Identificacion, FechaNacimiento FROM Persona WHERE estado = 'A';`,
    getIdPersonas: `SELECT idPersona, Nombres, Apellidos, Identificacion, FechaNacimiento FROM Persona WHERE idPersona = $1 AND estado = 'A';`,
    postPersonas: `INSERT INTO Persona (Nombres, Apellidos, Identificacion, FechaNacimiento, estado) VALUES ($1, $2, $3, $4, 'A');`,
    putEPersonas: `UPDATE Persona SET Nombres = $1, Apellidos = $2, Identificacion = $3, FechaNacimiento = $4 WHERE idPersona = $5;`,
    putEstadoPersonas: `UPDATE Persona SET estado = 'I' WHERE idPersona = $1;`,

    // Tabla Usuarios
    getUsuarios: `SELECT idUsuario, UserName, Mail, SessionActive, Persona_idPersona, Status FROM Usuarios WHERE estado = 'Activo';;`,
    getIdUsuarios: `SELECT idUsuario, UserName, Mail, SessionActive, Persona_idPersona, Status FROM Usuarios WHERE idUsuario = $1 AND estado = 'Activo';`,
    postUsuarios: `INSERT INTO Usuarios (UserName, Password, Mail, SessionActive, Persona_idPersona, Status, estado) VALUES ($1, $2, $3, $4, $5, $6, 'Activo');`,
    putEUsuarios: `UPDATE Usuarios SET UserName = $1, Password = $2,  SessionActive = $3,  Status = $4 WHERE idUsuario = $5;`,
    putEstadoUsuarios: `UPDATE Usuarios SET estado = 'I' WHERE idUsuario = $1;`,

    statsUsuario:'SELECT \n' +
        '    COUNT(*) FILTER (WHERE estado = \'Activo\') AS activos,\n' +
        '    COUNT(*) FILTER (WHERE estado = \'Inactivo\') AS inactivos,\n' +
        '    COUNT(*) FILTER (WHERE estado = \'Bloqueado\') AS bloqueados\n' +
        'FROM usuarios;\n',

    // Tabla Rol
    getRoles: `SELECT idRol, RolName FROM Rol WHERE estado = 'A';`,
    getIdRoles: `SELECT idRol, RolName FROM Rol WHERE idRol = $1 AND estado = 'A';`,
    postRoles: `INSERT INTO Rol (RolName, estado) VALUES ($1, 'A');`,
    putERoles: `UPDATE Rol SET RolName = $1 WHERE idRol = $2;`,
    putEstadoRoles: `UPDATE Rol SET estado = 'I' WHERE idRol = $1;`,

    // Tabla Rol_Usuarios
    getRolUsuarios: `SELECT idRol, idUsuario FROM Rol_Usuarios WHERE estado = 'A';`,
    getIdRolUsuarios: `SELECT idRol, idUsuario FROM Rol_Usuarios WHERE idRol = $1 AND idUsuario = $2 AND estado = 'A';`,
    postRolUsuarios: `INSERT INTO Rol_Usuarios (idRol, idUsuario, estado) VALUES ($1, $2, 'A');`,
    putERolUsuarios: `UPDATE Rol_Usuarios SET idRol = $1, idUsuario = $2 WHERE idRol = $3 AND idUsuario = $4;`,
    putEstadoRolUsuarios: `UPDATE Rol_Usuarios SET estado = 'I' WHERE idRol = $1 AND idUsuario = $2;`,

    // Tabla RolOpciones
    getRolOpciones: `SELECT idOpcion, NombreOpcion FROM RolOpciones WHERE estado = 'A';`,
    getIdRolOpciones: `SELECT idOpcion, NombreOpcion FROM RolOpciones WHERE idOpcion = $1 AND estado = 'A';`,
    postRolOpciones: `INSERT INTO RolOpciones (NombreOpcion, estado) VALUES ($1, 'A');`,
    putERolOpciones: `UPDATE RolOpciones SET NombreOpcion = $1 WHERE idOpcion = $2;`,
    putEstadoRolOpciones: `UPDATE RolOpciones SET estado = 'I' WHERE idOpcion = $1;`,

    // Tabla Rol_RolOpciones
    getRolRolOpciones: `SELECT idRol, idOpcion FROM Rol_RolOpciones WHERE estado = 'A';`,
    getIdRolRolOpciones: `SELECT idRol, idOpcion FROM Rol_RolOpciones WHERE idRol = $1 AND idOpcion = $2 AND estado = 'A';`,
    postRolRolOpciones: `INSERT INTO Rol_RolOpciones (idRol, idOpcion, estado) VALUES ($1, $2, 'A');`,
    putERolRolOpciones: `UPDATE Rol_RolOpciones SET idRol = $1, idOpcion = $2 WHERE idRol = $3 AND idOpcion = $4;`,
    putEstadoRolRolOpciones: `UPDATE Rol_RolOpciones SET estado = 'I' WHERE idRol = $1 AND idOpcion = $2;`,

    // Tabla Sessions
    getSessions: `SELECT FechaIngreso, FechaCierre, idUsuario FROM Sessions;`,
    postSessions: `INSERT INTO Sessions (FechaIngreso, FechaCierre, idUsuario) VALUES ($1, $2, $3);`,
};
