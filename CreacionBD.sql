DROP DATABASE IF EXISTS DinnerSys;
CREATE DATABASE IF NOT EXISTS DinnerSys;

CREATE TABLE IF NOT EXISTS Usuarios (
	usuarioId INT PRIMARY KEY AUTO_INCREMENT,
    Cedula varchar(20) UNIQUE NOT NULL,
    Nombres varchar(50) NOT NULL,
    Apellidos varchar(50) NOT NULL,
    TipoUsuario varchar(13) NOT NULL
);

CREATE TABLE IF NOT EXISTS DatosAcceso(
    usuarioId INT NOT NULL,
    Usuario varchar(50) UNIQUE NOT NULL,
    Contrasena varchar(50) NOT NULL,
    PRIMARY KEY (usuarioId),
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(usuarioId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Productos(
    ProductoId INT PRIMARY KEY AUTO_INCREMENT,
    Nombre varchar(50) NOT NULL,
    Descripcion varchar(50) NOT NULL,
    Precio INT NOT NULL,
    Categoria varchar(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS Mesas(
    MesaId INT PRIMARY KEY AUTO_INCREMENT,
    Estado BOOLEAN DEFAULT 0
);


CREATE TABLE IF NOT EXISTS Pedidos (
    pedidoId INT PRIMARY KEY AUTO_INCREMENT,
    FechaPedido DATETIME DEFAULT NOW() NOT NULL,
    MeseroId INT, /* MeseroId puede ser NULL por si se elimina entonces para que no se pierda la info */
    MesaId INT NOT NULL,
    FOREIGN KEY (MeseroId) REFERENCES Usuarios(UsuarioId) ON DELETE SET NULL,
    FOREIGN KEY (MesaId) REFERENCES Mesas(MesaId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DetallePedidoProducto(
    PedidoProductoId INT PRIMARY KEY AUTO_INCREMENT,
    PedidoId INT NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (PedidoId) REFERENCES Pedidos(pedidoId) ON DELETE CASCADE,
    FOREIGN KEY (ProductoId) REFERENCES Productos(ProductoId) ON DELETE CASCADE
);

/* TRIGGERS PARA INSERTAR DATOS AUTOMATICAMENTE */
/* TRIGGER PARA INSERTAR DATOS DE ACCESO AUTOMATICAMENTE CUANDO SE INSERTA UN USUARIO */
DELIMITER $$
CREATE TRIGGER InsertarDatosAcceso AFTER INSERT ON Usuarios
FOR EACH ROW
BEGIN
    INSERT INTO DatosAcceso (usuarioId, Usuario, Contrasena) VALUES 
        (NEW.usuarioId, CONCAT(REPLACE(NEW.Nombres, ' ','')), NEW.Cedula );
        /* El CONCAT(REPLACE(NEW.Nombres, ' ','')) Reemplaza los espacios en blanco por nada, es decir, los elimina.*/
END$$
DELIMITER ;



/* INSERCIONES DE PRUEBA */
INSERT INTO Usuarios (Nombres, Apellidos,  Cedula, TipoUsuario) VALUES 
('Austin', 'Post', '123456789', 'Administrador'),
('Jerson Andres', 'Herrera', '1731805852', 'Administrador'),
('Juan Jose', 'Marin', '1202957603', 'Mesero'),
('John David', 'Doe', '319457302', 'Mesero'),
('Laura Cristina', 'Lopez Acosta', '583024841', 'Mesero'),
('Sofia', 'Castillo', '315285014', 'Mesero'),
('Andres Steven', 'Vivas', '1340589420' ,'Mesero');

INSERT INTO Productos (Nombre, Descripcion, Precio, Categoria) VALUES 
('Arroz Paisa', 'Arroz paisa para 3 personas', 32000, 'Comida'),
('Hamburguesa', 'Hamburguesa de carne', 10000, 'Comida'),
('Papas Fritas', 'Papas fritas con queso', 5000, 'Comida'),
('Coca Cola', 'Coca Cola 500ml', 3000, 'Bebida'),
('Jugo de Naranja', 'Jugo de naranja 500ml', 3000, 'Bebida'),
('Cerveza', 'Cerveza 500ml', 5000, 'Bebida'),
('Agua', 'Agua 500ml', 2000, 'Bebida'),
('Ensalada', 'Ensalada de frutas', 5000, 'Comida'),
('Sandwich', 'Sandwich de pollo', 5000, 'Comida'),
('Cafe', 'Cafe 500ml', 2000, 'Bebida'),
('Te', 'Te 500ml', 2000, 'Bebida');

INSERT INTO Mesas (MesaId, Estado) VALUES 
(1, 1),
(2, 1),
(3, 1);

INSERT INTO Mesas (MesaId) VALUES 
(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15),(16),(17),(18),(19),(20);