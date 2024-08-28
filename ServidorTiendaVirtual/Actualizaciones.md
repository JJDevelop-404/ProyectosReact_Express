# ACTUALIZACIÓN 0.0.1
## GENERAL =>
En esta actualización se agregan librerias nuevas (dotenv, cookie-parser, jsonwebtoken, firebase) y se 
actualizan las anteriores. Se pasa de usar el almacenaje de fotos en local a usar firebase como nube para esto.
Se comienza a agregar la autenticación de usuarios con token (sólo envio y verificacion de este por una cookie)

## ESPECÍFICOS =>
1. Se consume servicio cloud de firebase para almacenar las fotos en ese lugar, como es obvio, el archivo 
    serviceAccountKey debe ser generado por usted en su proyecto de firebase (en el archivo firebase.js se explica mejor).
2. Se realiza la creación de tokens para verificar el usuario y su respectivo rol.
3. Se realizará todo el envio y manipulación de los token por medio de una cookie que es enviada directamente desde este
    servidor.
4. Se creo un archivo .env para crear la variable de entorno que su nombre es: SECRET_TOKEN y debe ir dentro de la carpeta
    ServidorTiendaVirtual, es decir en la raíz de la carpeta madre

# ACTUALIZACIÓN 0.1.0
## GENERAL =>
En este update se agrega el diagrama ER inicial de ShoesShop, también se realizan ajustes para recibir la cookie y para
quitarla cuando se desloguea nuestro usuario, además de esto se crea una función para poder prender la base de datos apenas
inicie el servidor, la idea es que si el servidor tiene un error por conexión, este se vuelva a intentar conectar a la BD
aún no se como podría hacerlo pero es una tarea pendiente.

## ESPECÍFICOS =>
1. Se agrega el archivo .mdj que contiende el diagrama entidad-relación de la base de datos de shoesshop, es un diagrama 
    inicial, por ende solo hay 4 tablas.
2. El envío y recibimiento de la cookie ya está bien, solo que siempre debe ser por el mismo dominio, es decir si es localhost 
    o una ip deben ser las mismas ya que al no ser https no funcionarán si se envia desde otros dominios diferentes.
3. Se crea una serie de algoritmos en conexion.js para encender la bd de manera autónoma al iniciar el servidor.

# ACTUALIZACIÓN 0.1.1
## GENERAL => CAMBIO DE BD SQL A NoSQL
Se cambia el sistema de base de datos, ya no se guardará en una base de datos MySQL si no que se usara *Firestore*, _es decir, los_
_datos se guardarán en documentos_. Nueva carpeta llamada config, se elimina carpeta helpers y carpeta conexion.

## ESPECÍFICOS => 
1. Se deja a un lado la base de datos local MySQL y se usa Firestore de firebase para guardado de datos en la nube, esto para cuando
    contar con una base de datos en la nube y no en local.
2. Se elimina por obvias razones la carpeta conexion que contiene la configuracion de conextividad a la base de datos MySQL.
3. Se elimina la carpeta _helpers_ para crear la carpeta _config_ en la cual se encuentras los archivos de configuración de firebase y
    la generación del token.
4. Falta y esta pendiente migrar toda la base de datos a firebase storage, también como los metodos crud de usuarios y productos

