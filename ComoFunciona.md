Pasos para que funcione el codigo:

1. npm install dentro de la carpeta DinnerSys_Back
2. npm install dentro de la carpeta Servidor
3. Para correr el front (dentro de la carpeta DinnerSys_Back):
    npm run dev
4. Para correr el back (dentro de la carpeta Servidor):
    npm run back
5. Instalar la extension REST Client, esto para poder usar el archivo (Peticiones.http)

OTRAS COSAS:
GESTOR DE BASE DE DATOS Y CREACIÓN DE LA BASE DE DATOS
El gestor de base de datos usado, fue mariadb, por ende deberían tener XAMPP Control Panel, y verificar que el puerto de MySQL diga 3306, o sino, en el archivo conexion.js en la carpeta Servidor dentro de la carpeta conexion le cambias el puerto al desees, luego, en el archivo CreacionBD.sql, lo copias y lo pegas para crear tú base de datos.

PARA HACER PRUEBAS DE CRUD DE TODAS LAS ENTIDADES
Ahora, si deseas probar todos los metodos y rutas, hay un archivo llamado Peticiones.http, para poder usarlo, necesitaras instalar una extensión llamada (REST Client de Huachao Mao), ahora, arriba de cada metodo http, aparece Send Request, si clicas ahí, este ejecutará la funcion que tenga esa ruta. Si deseas ver cómo trabaja la función, te puedes dirigir a la carpeta Servidor, a la carpeta router, allí notarás y verás todos los archivos con sus repectivas rutas y la función que ejecutan, si das (ctrl + click) al nomrbe de la función, esta acción te redireccionará a donde está esa funcion, que es dentro de la carpeta controller, y ahí están todas las funciones de cada entidad.

COMO SE DEBE ACCEDER A LAS RUTAS
Todas las rutas antes de acceder a ellas, tienen un prefijo por asi decirlo, es decir, no vas a poder decir dentro del archivo (Peticiones.http) METHOD "http://localhost:3003/createUsuario", no, debes primero consultar el archivo app.js que está dentro de la carpeta Servidor, y ahí verás qué de más se necesita para poder acceder a esa ruta, en el caso de ejemplo que puse, debes decirle "http://localhost:3003/usuarios/createUsuario", como ves se puso "usuarios" antes de acceder a la ruta "createUsuario", esto es así con todas las entidades, primero miras como se debe usar en el app.js y luego ya en el router de tu entidad, miras como es la ruta que deseas usar