Actualización 0.0.1 => 
1. Se realizan cambios en la base de datos
2. Se realizan cambios en metodos get de productos y usuarios, pues estos traian en su respuesta el
campo "Inactivo" y este completamente innecesario ya que no nos es de utilidad puesto que solo traiamos
los registros cuyo valor en el campo Inactivo era 0, es decir falso (quiere decir que esta activo)

Actualización 0.1.0 =>
1. Se hacen cambios mínimos, nada importante, solo en la usuarios algunas respuestas eran status 200
se cambio a status 201 que es de confirmación
2. Cambios en la base de datos, se agregaron más productos en el insert y se agrega nuevo trigger encargado
de actualizar la tabla DatosAcceso para cuando se ejecute un upddate en la tabla usuarios y se actualize la cedula
o el nombre. Además se le quita el UNIQUE al campo Usuario de la tabla DatosAcceso

Actualización 0.1.1 =>
1. Se crea una nueva tabla Categorias en la base de datos
2. Se actualiza metodo get y put de productos
3. Se crea archivos correspondientes para el CRUD de Categorias y se agrega la ruta al app.js
4. Peticiones.http con nuevos llamados y un poco más organizado
5. Se actualiza peticiones de Pedidos y se eliminar la funcion getPedidoXMesaId ya que no es necesaria, esta
se reemplaza por getPedidosXMeseroId (pendiente la funcion de actualizar, debe elimnar si se llega un producto
menos, agregar uno nuevo si llega nuevo, o sumar la cantidad si llega uno existente).

Actualización 1.0.0 =>
1. Cambios en la entidad Pedidos, ajustes en los get, nueva funcionalidad del update, agrega, quita y edita productos

2. Actualización de librerias