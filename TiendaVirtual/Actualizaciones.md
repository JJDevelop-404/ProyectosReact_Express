# ACTUALIZACIONES Y CAMBIOS HECHOS Y POR HACER
## Actualización 0.0.0.1
1. Se agrega componente FormCreateEdit para manejar el crear y editar, también igualmente se agrega el componente
    TableList para mostrar todas las entidades.

2. Se ajustan y cambian estilos, evitando dejarlos generales para evitar futuros conflictos con los estilos.

3. Se cambia el useAuth agregandosele el useMemo para evitar realizar la recarga de pantalla para su redirección.

4. El AuthProvider tendrá unos cambios mínimos ya que se usará una cookie para el manejo de la sesión y datos para
    permisos y demás.

5. La API de productos se le agregan configuraciones de axios para el envio de las cookies en cada petición y demás
    se deberá manejar una sola configuración de axios para que esta sea una sola en todas las API's y no haya que 
    configurarlo en cada archivo dentro de la carpeta API.

6. Se deberá configurar los estilos del componente FormCreateEdit y el de TablaListar.

De resto han sido cambios estéticos y meramente visuales y se actualizaron librerias y se instalaron unas nuevas
como sweetalert2 para las alertas personalizadas y demás

# Actualización 0.0.1.0
1. Se arreglan los componentes TablaListar y FormCreateEdit.

2. Se crea un sólo objeto de axios para usarlo en todas las rutas.

3. Se ajustan estilos del componente Card y ya se renderiza solo pansandole la lista de productos.

4. Se ajusta funcion de CrearProducto y ModificarProducto.

5. Algunos ajustes de estilos extra y nuevas fuentes agregadas de google fonts.
