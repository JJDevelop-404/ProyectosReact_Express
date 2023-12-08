## OBJETOS PRINCIPALES:

## Producto: Cada producto representa una zapatilla en la tienda. Los atributos de un producto podrían incluir:
    ID
    Nombre
    Descripción
    Precio
    Imagen
    Tallas disponibles
    Categoría (por ejemplo, deportivas, casuales, etc.)

## Usuario: Un usuario puede registrarse, iniciar sesión y realizar compras. Los atributos de un usuario podrían incluir:
    ID
    Nombre de usuario
    Correo electrónico
    Contraseña (almacenada de forma segura)
    Carrito de compras
    Historial de pedidos

## Carrito de Compras: Cada usuario tiene un carrito de compras que almacena los productos seleccionados. Los atributos de un carrito de compras podrían incluir:
    ID del carrito
    Lista de productos en el carrito
    Cantidad de cada producto
    Total del carrito

## Pedido: Un pedido representa una compra realizada por un usuario. Los atributos de un pedido podrían incluir:
    ID del pedido
    Usuario que realizó el pedido
    Lista de productos en el pedido
    Estado del pedido (pendiente, enviado, entregado)
    Dirección de envío
    Método de pago

## Funcionalidades Clave:
    Registro e inicio de sesión de usuarios.
    Navegación y búsqueda de productos por categoría, marca, precio, etc.
    Visualización detallada de productos con imágenes y descripciones.
    Agregar y eliminar productos del carrito de compras.
    Realizar el proceso de pago y completar pedidos.
    Seguimiento de pedidos con actualizaciones de estado.
    Administración de productos y pedidos para los propietarios de la tienda (panel de administración).