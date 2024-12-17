export const queries = {
    // Informacion del sistema
    getDatosB: 'SELECT u.UserName, u.mail, u.Status AS UsuarioEstado, u.FailedAttempts AS IntentosFallidos, s.FechaIngreso AS FechaIngresoSesion, s.FechaCierre AS FechaCierreSesion FROM Usuarios u JOIN Persona p ON u.Persona_idPersona = p.idPersona LEFT JOIN sessions s ON u.idUsuario = s.idUsuario WHERE u.idUsuario = :id AND s.FechaIngreso < (SELECT MAX(FechaIngreso) FROM sessions WHERE idUsuario = u.idUsuario) ORDER BY s.FechaIngreso DESC NULLS LAST LIMIT 1;',
    getDashboard: 'select count(*) filter (where status = \'Activo\') as activos, count(*) filter (where status = \'Inactivo\') as inactivos, count(*) filter (where status = \'Bloqueado\') as bloqueados, count(*) filter (where FailedAttempts > 0) as sesion_fallidas from usuarios;',
    getMemuUsuario: 'select r.rolname, r2.idopcion, r2.nombreopcion, r2.url from usuarios u, rol_usuarios ru, rol r, rol_rolopciones rr , rolopciones r2 where u.idusuario = ru.idusuario and ru.idrol =r.idrol and r.idrol = rr.idrol and rr.idopcion = r2.idopcion and r2.eliminado = false and u.idusuario = :idusuario',


    // Usuario
    putUsuario: 'CALL actualizar_usuario_persona(:id, :nombres, :apellidos, :username, :mail);',
    postUsario: 'select crear_usuario_con_validaciones (:nombres, :apellidos, :identificacion, :username, :password);',

}