DROP DATABASE IF EXISTS ShoesShop;
CREATE DATABASE ShoesShop;
USE ShoesShop;


/* CREACION DE TABLAS */

/* Tabla Usuarios */
CREATE TABLE Usuarios(
    UsuarioId INT PRIMARY KEY AUTO_INCREMENT,
    PrimerNombre varchar(30) NOT NULL,
    SegundoNombre varchar(30) NULL DEFAULT '',
    PrimerApellido varchar(50) NOT NULL,
    SegundoApellido varchar(50) NULL DEFAULT '',
    FechaNacimiento CURRENT_DATE NOT NULL,
    Rol varchar(20) NULL DEFAULT 'cliente'
);

/* Insercion Tabla Usuarios */
INSERT INTO Usuarios(PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, FechaNacimiento) VALUES
('Fernanda', '', 'Calderon', 'Chicaiza', '2001-06-23'),
('Luis', 'Fernando', 'Sanchez', 'Rodriguez', '1983-02-12'),
('María', 'Isabel', 'García', 'López', '1995-09-08'),
('Pedro', 'Antonio', 'Martínez', 'Gómez', '1979-11-30'),
('Ana', 'Gabriela', 'Hernández', 'Castillo', '1990-04-15'),
('Javier', 'Andrés', 'Flores', 'Pérez', '1988-07-22'),
('Carla', 'Daniela', 'Ramírez', 'Vargas', '2000-12-10');

/* Tabla DatosAcceso */
CREATE TABLE DatosAcceso(
    UsuarioId INT PRIMARY KEY AUTO_INCREMENT,
    Correo varchar(50) NOT NULL,
    Contrasena varchar(50) NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(UsuarioId)
);

/* Insercion Tabla Datos Acceso */
INSERT INTO DatosAcceso(UsuarioId, Correo, Contrasena) VALUES
(1, 'fernanda@cliente.com', 'fernanda'), 
(2, 'luis@cliente.com', 'luis'), 
(3, 'maria@cliente.com', 'maria'),
(4, 'pedro@cliente.com', 'pedro'),
(5, 'ana@cliente.com', 'ana'),
(6, 'javier@cliente.com', 'javier'),
(7, 'carla@cliente.com', 'carla');

/* Tabla Productos */
CREATE TABLE Productos(
    ProductoId INT PRIMARY KEY AUTO_INCREMENT,
    Nombre varchar(50) NOT NULL,
    Descripcion varchar(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    URLImagen varchar(200) NOT NULL
)