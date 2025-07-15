CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni INTEGER UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(150),
    telefono VARCHAR(50)
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    matricula_profesional VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150),
    telefono VARCHAR(50)
);

CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER NOT NULL REFERENCES pacientes(id) ON DELETE CASCADE,
    medico_id INTEGER NOT NULL REFERENCES medicos(id) ON DELETE CASCADE,
    fecha_hora TIMESTAMP NOT NULL,
    motivo VARCHAR(255),
    estado VARCHAR(20),
    observaciones VARCHAR(500)
);