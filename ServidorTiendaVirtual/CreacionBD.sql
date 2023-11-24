DROP DATABASE IF EXISTS ShoesShop;
CREATE DATABASE ShoesShop;
USE ShoesShop;

CREATE TABLE Productos(
    ProductoId INT PRIMARY KEY AUTO_INCREMENT,
    Nombre varchar(50) NOT NULL,
    Descripcion varchar(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    URLImagen varchar(200) NOT NULL
)