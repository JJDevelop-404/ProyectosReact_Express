Actualizacion 0.0.1 => 
1. En primera instancia se integraron y actualizaron librerias, las librerias que se agregaron fueron:
    bootstrap => para estilos responsive 
    popperjs => el javascript de bootstrap
    formik => para el envio ya la validación de formularios
    yup => para la validación de diferentes campos en el formularios
    Para la actualización de librerias se hizo uso de npm-check

2. Se reconstruye el componente Tabla, haciendolo un componente el cual se encarga de hacer una tabla 
que contenga todos los datos del objeto que le pasemos. Es una tabla de visualización para la visualización de datos

3. Se reconstruye también el componente Navbar haciéndolo responsive, reemplazando la etiquete a por el componente Link
de react-router-dom funcionando; para que este funcionara toco ingresarlo como componente que se renderiza siempre por 
encima de todos en el main.jsx en la variable que contiene la concatenación de las rutas. Link es importante ya que este
evita las recargas en nuestra página web

4. Se quitaron muchos estilos del index.css y de otras partes ya que causaban conflictos con bootstrap. Unos se
eliminaron, otros simplemente se le cambiaron de nombre

5. También se quita del main.jsx el React.StrictMode ya que esto renderizaba 2 veces y hacia que el servidor back
hiciera dos peticiones igualmente a la bd

6. En el AuthProvider se hicieron cambios también, principalmente en la obtención de los datos del usuario. 
    Explico:
        Antes estos se obtenían con cada renderización, además de esto, habia que enviarle cada dato desde el 
        loggin, es decir, no se obtenían solos con el "User" almacenado en el localstorage, había que hacer una 
        recarga manual de la página para que estos se obtuvieran. Para solucionarlo se deja a un lado
        el useEffect y se hace uso del useMemo, que este lo que hace es almacenar los valores y se generará 
        una nueva renderización dependiendo del cambio en una variable que se le indique.

Actualización 0.1.0 =>
1. Se crea componente FormCrearEditar, el cual es para los formularios de crear y editar para cualquier entidad

2. Se hacen pequeños ajusten en componentes como Tabla y la Navbar

3. Se crean todos los respectivos crud de todas las entidades funcionando a excepcion de la función eliminar y editar de las mesas
(creo se anularán)

4. Se agrega libreria sweetalert2 => para el manejo de las alertas, usado principalment en el componente Tabla y FormCrearEditar

5. Se inicio parte de la vista del pedido del mesero

6. Se agrega funciones crear de las entidades y su funcionalidad

Actualización 0.1.1 =>
1. Se agregar nueva entidad (Categorias) se hace su respectivo CRUD y ya está funcional

2. Se acomoda la función de mostrar los option del select dentro del componente FormCrearEditar, ya no es una matriz, es con una lista

3. Al actualizar ese componente (FormCrearEditar), toco ajustar varias cosas en los componentes de gestión para que funcionará 
nuevamente todo

Actualización 1.0.0 =>
1. Se agrega funcion de crear y traer pedido por el usuarioId en la API - Pedidos.js

2. Se realiza la vista pedidos y ya está disponible y funcional, también la vista de pedidosRealizados (que carga solo los pedidos del
dia actual, es decir, no muestra pedidos anteriores, sólo muestra los que se hicieron en el dia).

3. Se elimina del navbar del mesero el acceso a pedidos, y sólo muestra pedidosRealizados. Para acceder a pedidos desde la URL no se puede
ya que este necesita que se le pase el id de la mesa, por ende, se debe escoger una mesa si o si para lograr acceder

4. Cambios mínimos en componentes como Carrusel (se quita el envio del usuarioId ya que no es necesario (para eso es el useAuth)), 
FormCrearEditar (Se agrega la opcion --Seleccioe-- en el select) y Tabla (se crea una funcion llamada alertError para mostrar un mensaje de error)