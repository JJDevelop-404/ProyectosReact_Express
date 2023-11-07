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

CREATE TABLE IF NOT EXISTS DetalleMesasMeseros(
    MesasMeseroId INT PRIMARY KEY AUTO_INCREMENT,
    MesaId INT NOT NULL,
    MeseroId INT NOT NULL,
    CantidadClientes INT DEFAULT 0,
    FechaAsignacion DATETIME DEFAULT NOW() NOT NULL,
    FechaDesasignacion DATETIME DEFAULT NULL,
    FOREIGN KEY (MesaId) REFERENCES Mesas(MesaId) ON DELETE CASCADE,
    FOREIGN KEY (MeseroId) REFERENCES Usuarios(usuarioId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Pedidos (
    pedidoId INT PRIMARY KEY AUTO_INCREMENT,
    NombreCliente varchar(50) NOT NULL,
    MesaId INT NOT NULL,
    MeseroId INT NOT NULL,
    FOREIGN KEY (MesaId) REFERENCES Mesas(MesaId) ON DELETE CASCADE,
    FOREIGN KEY (MeseroId) REFERENCES Usuarios(usuarioId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DetallePedidosProducto(
    PedidosProducto INT PRIMARY KEY AUTO_INCREMENT,
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

/* TRIGGER PARA ACTUALIZAR EL ESTADO A 1 DE UNA MESA CUANDO SE AGREGUE A LA TABLA DetalleMesasMeseros */
DELIMITER $$
CREATE TRIGGER ActualizarEstadoMesa AFTER INSERT ON DetalleMesasMeseros
FOR EACH ROW
BEGIN
    UPDATE Mesas SET Estado = 1 WHERE MesaId = NEW.MesaId;
END$$
DELIMITER ;


/* TRIGGER PARA ACTUALIZAR EL ESTADO A 0 A UNA MESA CUANDO SE MODIFIQUE EL CAMPO FechaDesignacion EN LA TABLA DetalleMesasMeseros */
DELIMITER $$
CREATE TRIGGER ActualizarEstadoMesaDesasignacion AFTER UPDATE ON DetalleMesasMeseros
FOR EACH ROW
BEGIN
    IF NEW.FechaDesasignacion IS NOT NULL THEN
        UPDATE Mesas SET Estado = 0 WHERE MesaId = NEW.MesaId;
    END IF;
END$$
DELIMITER ;

/* INSERCIONES DE PRUEBA */
INSERT INTO Usuarios (Nombres, Apellidos,  Cedula, TipoUsuario) VALUES 
('Austin Richard', 'Post', '1103857395', 'Administrador'),
('Jerson Andres', 'Herrera', '1731805852', 'Administrador'),
('Juan Jose', 'Marin', '1202957603', 'Mesero'),
('John David', 'Doe', '319457302', 'Mesero'),
('Laura Cristina', 'Lopez Acosta', '583024841', 'Mesero'),
('Sofia Geraldine', 'Montano', '315285014', 'Mesero'),
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

INSERT INTO Mesas (MesaId) VALUES 
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15),(16),(17),(18),(19),(20);

INSERT INTO DetalleMesasMeseros (MesaId, MeseroId) VALUES 
(1, 3),(2, 7),(3, 5),(4, 7),(5, 3),(6, 7),(7, 5),(8, 6),(9, 3),(10, 4),
(11, 5),(12, 6),(13, 3),(14, 4),(15, 5),(16, 6),(17, 3),(18, 4),(19, 5),(20, 7);

