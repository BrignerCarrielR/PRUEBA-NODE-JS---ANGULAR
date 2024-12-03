export const queries = {
    // Login
    getUsuarioCorreo : 'select u.idUsuario, u.username, u.password, r.rolname , u.sessionactive, u.Status, u.FailedAttempts FROM Usuarios u JOIN Persona p ON u.Persona_idPersona = p.idPersona LEFT JOIN Rol_Usuarios ru ON u.idUsuario = ru.idUsuario LEFT JOIN Rol r ON ru.idRol = r.idRol where (username = $1 or mail = $1);',
    putActualizarIntentos : 'UPDATE Usuarios SET FailedAttempts = FailedAttempts + 1 WHERE idUsuario = $1;',
    putBloquearUsuario: 'UPDATE Usuarios SET Status = \'Bloqueado\' WHERE idUsuario = $1;',
    putResetearIntentos:'UPDATE Usuarios SET FailedAttempts = 0 WHERE idUsuario = $1;',
    postSesion: 'insert into sessions(idusuario, fechaingreso) values ( $1,NOW());',
    putSesionActive:'UPDATE Usuarios SET sessionactive = \'S\' WHERE idUsuario = $1;',

    // Logout
    getSesionActive:'select sessionactive from Usuarios where idUsuario = $1',
    putSesionInactive:'UPDATE Usuarios SET sessionactive = \'N\' WHERE idUsuario = $1;',
    putFechaSesionInactive:'update sessions set fechacierre = NOW() where fechacierre is null and idusuario = $1 ',

    // Informacion del sistema
    getDatosB: 'SELECT u.UserName, u.mail, u.Status AS UsuarioEstado, u.FailedAttempts AS IntentosFallidos, s.FechaIngreso AS FechaIngresoSesion, s.FechaCierre AS FechaCierreSesion FROM Usuarios u JOIN Persona p ON u.Persona_idPersona = p.idPersona LEFT JOIN sessions s ON u.idUsuario = s.idUsuario WHERE u.idUsuario = $1 AND s.FechaIngreso < (SELECT MAX(FechaIngreso) FROM sessions WHERE idUsuario = u.idUsuario) ORDER BY s.FechaIngreso DESC NULLS LAST LIMIT 1;',
    getDashboard : 'select count(*) filter (where status = \'Activo\') as activos, count(*) filter (where status = \'Inactivo\') as inactivos, count(*) filter (where status = \'Bloqueado\') as bloqueados, count(*) filter (where FailedAttempts > 0) as sesion_fallidas from usuarios;',
    getMemuUsuario : 'select r.rolname, r2.idopcion, r2.nombreopcion, r2.url from usuarios u, rol_usuarios ru, rol r, rol_rolopciones rr , rolopciones r2 where u.idusuario = ru.idusuario and ru.idrol =r.idrol and r.idrol = rr.idrol and rr.idopcion = r2.idopcion and r2.eliminado = false and u.idusuario = $1',

    // Usuario
    getUsuario: 'select p.nombres, p. apellidos , u.username , u.mail from usuarios u , persona p where u.persona_idpersona= p.idpersona and u.idusuario = $1',
    getUsuariosAdmin :'SELECT u.idUsuario, p.Nombres, p.Apellidos, u.UserName, u.Mail, r.RolName, u.Status FROM Usuarios u JOIN Persona p ON u.Persona_idPersona = p.idPersona LEFT JOIN Rol_Usuarios ru ON u.idUsuario = ru.idUsuario LEFT JOIN Rol r ON ru.idRol = r.idRol;',
    putUsuario : 'CALL actualizar_usuario_persona($1, $2, $3, $4, $5);',
    postUsario: 'select crear_usuario_con_validaciones($1, $2, $3, $4, $5);',
};

// CALL crear_usuario_con_validaciones(
//     'Juan Alberto',
//     'Piguave Loor',
//     '1203574901',
//     'jpiguavel',
//     'Piguave123!'
// );
