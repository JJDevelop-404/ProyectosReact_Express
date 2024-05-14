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
