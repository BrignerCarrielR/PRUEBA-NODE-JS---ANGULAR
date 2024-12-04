-- PROCEDIMIENTO PARA EDITAR NUESTRO USUARIO/PERSONA
create or replace procedure actualizar_usuario_persona(
    p_idusuario INTEGER, 
    p_nombres VARCHAR, 
    p_apellidos VARCHAR, 
    p_username VARCHAR, 
    p_mail VARCHAR
)
language plpgsql
as $$
begin
    -- Actualizamos la tabla Persona
    update Persona
    set 
        Nombres = p_nombres, 
        Apellidos = p_apellidos
    where idPersona = (
        select persona_idPersona 
        from Usuarios 
        where idUsuario = p_idusuario
    );

    -- Actualizamos la tabla Usuarios
    update Usuarios
    set 
        UserName = p_username, 
        Mail = p_mail
    where idUsuario = p_idusuario;

    -- Mensaje de éxito
    raise notice 'Actualización exitosa para el usuario con idUsuario = %', p_idusuario;
end;
$$;

CALL actualizar_usuario_persona(2, 'Ana', 'Gomez', 'agomez123a', 'agomez123@example.com');


--FUNCION PARA CREAR UNA PERSONA Y UN USUARIO
CREATE OR REPLACE FUNCTION crear_usuario_con_validaciones(
    p_nombres VARCHAR, 
    p_apellidos VARCHAR, 
    p_identificacion VARCHAR, 
    p_username VARCHAR, 
    p_password VARCHAR
) RETURNS VARCHAR
LANGUAGE plpgsql AS $$
DECLARE
    p_resultado VARCHAR := 'Proceso fallido';  -- Valor inicial predeterminado
    v_count INTEGER;
    v_correo VARCHAR;
BEGIN
    -- Validación de la identificación (10 dígitos, sin 4 consecutivos iguales)
    IF LENGTH(p_identificacion) != 10 OR p_identificacion !~ '^\d{10}$' THEN
        RETURN 'La identificación debe tener exactamente 10 dígitos numéricos';
    END IF;

    IF p_identificacion ~ '(\d)\1\1\1' THEN
        RETURN 'La identificación no puede tener 4 dígitos consecutivos iguales';
    END IF;

    -- Generación del correo
    v_correo := LOWER(SUBSTRING(p_nombres FROM 1 FOR 1) || SUBSTRING(p_apellidos FROM 1 FOR 8) || '@mail.com');

    -- Verificar si el correo ya existe
    SELECT COUNT(*) INTO v_count FROM Usuarios WHERE Mail = v_correo;
    IF v_count > 0 THEN
        v_correo := LOWER(SUBSTRING(p_nombres FROM 1 FOR 1) || SUBSTRING(p_apellidos FROM 1 FOR 8) || '1@mail.com');
    END IF;

    -- Validaciones del nombre de usuario
    IF p_username ~ '[^\w]' THEN
        RETURN 'El nombre de usuario no debe contener signos';
    END IF;

    SELECT COUNT(*) INTO v_count FROM Usuarios WHERE UserName = p_username;
    IF v_count > 0 THEN
        RETURN 'El nombre de usuario ya está en uso';
    END IF;

    -- No debe estar duplicado
    SELECT COUNT(*) INTO v_count FROM Usuarios WHERE UserName = p_username;
    IF v_count > 0 THEN
        RETURN 'El nombre de usuario ya está en uso';
    END IF;
    
    -- Al menos un número
    IF p_username !~ '\d' THEN
        RETURN 'El nombre de usuario debe contener al menos un número';
    END IF;
    
    -- Al menos una letra mayúscula
    IF p_username !~ '[A-Z]' THEN
         RETURN 'El nombre de usuario debe contener al menos una letra mayúscula';
    END IF;
    
    -- Longitud máxima de 20 y mínima de 8
    IF LENGTH(p_username) < 8 OR LENGTH(p_username) > 20 THEN
        RETURN 'El nombre de usuario debe tener entre 8 y 20 caracteres';
    END IF;

    -- Validación de la contraseña
    -- Al menos 8 caracteres
    IF LENGTH(p_password) < 8 THEN
        RETURN 'La contraseña debe tener al menos 8 caracteres';
    END IF;
    
    -- Al menos una letra mayúscula
    IF p_password !~ '[A-Z]' THEN
         RETURN 'La contraseña debe tener al menos una letra mayúscula';
    END IF;

    -- No debe contener espacios
    IF p_password ~ '\s' THEN
        RETURN 'La contraseña no debe contener espacios';
    END IF;

    -- Debe tener al menos un signo
    IF p_password !~ '[\W]' THEN
        RETURN 'La contraseña debe contener al menos un signo';
    END IF;

    -- Inserción en las tablas
    INSERT INTO Persona (Nombres, Apellidos, Identificacion, FechaNacimiento)
    VALUES (p_nombres, p_apellidos, p_identificacion, CURRENT_DATE)
    RETURNING idPersona INTO v_count;

    INSERT INTO Usuarios (UserName, Password, Mail, SessionActive, Status, Persona_idPersona)
    VALUES (p_username, p_password, v_correo, 'N', 'Activo', v_count);

    RETURN 'Usuario y persona creados exitosamente';
END;
$$;




SELECT crear_usuario_con_validaciones(
    'Juan Alberto', 
    'Piguave Loor', 
    '1203574901', 
    'Jpiguavel1', 
    'Piguave123!'
);

