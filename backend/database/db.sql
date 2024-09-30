--Usuarios

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

--Eventos

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    cupo_disponible INT NOT NULL,
    tipo ENUM('gratuito', 'pago') NOT NULL,
    valor_base DECIMAL(10, 2),
    fecha_apertura_inscripciones DATE NOT NULL,
    fecha_cierre_inscripciones DATE NOT NULL,
    categoria ENUM('conferencias', 'seminarios', 'entretenimiento') NOT NULL
);


--Asistentes

CREATE TABLE asistentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    celular VARCHAR(20) NOT NULL
);


--Codigos Promocionales

CREATE TABLE codigos_promocionales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    valor DECIMAL(5, 2) NOT NULL,
    fecha_inicio_codigo_promocional DATE NOT NULL,
    fecha_cierre_codigo_promocional DATE NOT NULL,
    estado ENUM('disponible', 'no_disponible') NOT NULL
);


--Eventos_Asistentes

CREATE TABLE inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_asistente INT,
    id_evento INT,
    fecha_inscripcion DATE NOT NULL,
    tipo_entrada ENUM('vip', 'general') NOT NULL,
    valor_final DECIMAL(10, 2) NOT NULL,
    id_codigo_promocional INT,
    categoria_evento ENUM('conferencias', 'seminarios', 'entretenimiento') NOT NULL,
    fecha_evento DATE NOT NULL,
    FOREIGN KEY (id_asistente) REFERENCES asistentes(id),
    FOREIGN KEY (id_evento) REFERENCES eventos(id),
    FOREIGN KEY (id_codigo_promocional) REFERENCES codigos_promocionales(id)
);
