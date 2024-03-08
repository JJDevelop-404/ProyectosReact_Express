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
