-- Tabla Persona
CREATE TABLE Persona (
    idPersona SERIAL PRIMARY KEY,
    Nombres VARCHAR(80),
    Apellidos VARCHAR(60),
    Identificacion VARCHAR(12),
    FechaNacimiento DATE,
    Eliminado BOOLEAN DEFAULT FALSE -- 'FALSE' = no eliminado, 'TRUE' = eliminado
);


-- Tabla Usuarios
CREATE TABLE Usuarios (
    idUsuario SERIAL PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Mail VARCHAR(120),
    SessionActive CHAR(1),
    Persona_idPersona INTEGER,
    Status VARCHAR(20),
    CONSTRAINT fk_Persona FOREIGN KEY (Persona_idPersona)
    REFERENCES Persona (idPersona)
);
ALTER TABLE Usuarios
ADD COLUMN FailedAttempts INT DEFAULT 0;


-- Tabla Rol
CREATE TABLE Rol (
    idRol SERIAL PRIMARY KEY,
    RolName VARCHAR(50) NOT NULL,
    Eliminado BOOLEAN DEFAULT FALSE -- 'FALSE' = no eliminado, 'TRUE' = eliminado
);

-- Tabla Rol_Usuarios (relación entre Rol y Usuarios)
CREATE TABLE Rol_Usuarios (
    idRol INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    Eliminado BOOLEAN DEFAULT FALSE, -- 'FALSE' = no eliminado, 'TRUE' = eliminado
    PRIMARY KEY (idRol, idUsuario),
    CONSTRAINT fk_Rol FOREIGN KEY (idRol)
    REFERENCES Rol (idRol),
    CONSTRAINT fk_Usuario FOREIGN KEY (idUsuario)
    REFERENCES Usuarios (idUsuario)
);


-- Tabla RolOpciones
CREATE TABLE RolOpciones (
    idOpcion SERIAL PRIMARY KEY,
    NombreOpcion VARCHAR(50) NOT NULL,
    Url VARCHAR(100) NOT NULL,
    Eliminado BOOLEAN DEFAULT FALSE -- 'FALSE' = no eliminado, 'TRUE' = eliminado
);


-- Tabla Rol_RolOpciones (relación entre Rol y RolOpciones)
CREATE TABLE Rol_RolOpciones (
    idRol INTEGER NOT NULL,
    idOpcion INTEGER NOT NULL,
    Eliminado BOOLEAN DEFAULT FALSE, -- 'FALSE' = no eliminado, 'TRUE' = eliminado
    PRIMARY KEY (idRol, idOpcion),
    CONSTRAINT fk_Rol_Rel FOREIGN KEY (idRol)
    REFERENCES Rol (idRol),
    CONSTRAINT fk_RolOpciones FOREIGN KEY (idOpcion)
    REFERENCES RolOpciones (idOpcion)
);


-- Tabla Sessions
CREATE TABLE Sessions (
    FechaIngreso TIMESTAMP NOT NULL,    
    FechaCierre TIMESTAMP ,              
    idUsuario INTEGER NOT NULL,
    CONSTRAINT fk_Session_Usuario FOREIGN KEY (idUsuario)
    REFERENCES Usuarios (idUsuario)
);


SELECT 
    COUNT(*) FILTER (WHERE estado = 'Activo') AS activos,
    COUNT(*) FILTER (WHERE estado = 'Inactivo') AS inactivos,
    COUNT(*) FILTER (WHERE estado = 'Bloqueado') AS bloqueados
FROM usuarios;
