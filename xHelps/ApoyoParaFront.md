## COMO USAR BOOTSTRAP EN EL FRONT DE ESTE PROYECTO:
    Pagina de bootstrap => https://getbootstrap.com/
    Video visto => https://www.youtube.com/watch?v=XPBniyikjek
    
    Instalar bootstrap:
        1. npm i bootstrap@5.3.2
        2. npm i @popperjs/core

    En el main.jsx ponemos estas lineas para importar tanto el css y el js de bootstrap:
        import 'bootstrap';
        import 'bootstrap/dist/css/bootstrap.min.css';
    
## INTEGRAR FONT-AWESOME PARA MANEJO DE ICONOS:
    Instalar font-awesome:
        npm i --save @fortawesome/fontawesome-svg-core

    # Free icons styles
        npm i --save @fortawesome/free-regular-svg-icons
        npm i --save @fortawesome/free-brands-svg-icons
        npm i --save @fortawesome/free-solid-svg-icons
        npm i --save @fortawesome/react-fontawesome@latest

BUSCAR REFERENCIAS ACADEMICAS Y COMERCIALES


## INTEGRAR ICONOS PROPIOS EN EL PROYECTO:
    1. Diseñamos el icono o descargamos en formato svg, lo ideal es que sea solo el icono, es decir, que no se muestre
    nada mas, ni un fondo ni nada, que sea solo la imagen vectorial, para esto podemos usar Vectroizer.ai y de ahi la descargamos
    en formato svg
    2. Nos dirigimos a Icomoon, una página web que nos permitirá crear nuestros iconos y descargarlos como fuentes de texto
    3. Una vez descargado nuestra carpeta de iconos, nos creará una carpeta con varios archivos, pero sólo usaremos el archivo style.css
    y la carpeta fonts
    4. En la carpeta public de nuestro proyecto, creamos una carpeta llamada iconosPropios o como desees llamarlo, despues, en nuestra nueva 
    carpeta, creamos otras dos, (una para los fonts), llamada fonts (y otra para el style.css) llamada styles
    5. Ahora, debemos actualizar los imports en nuestro archivo style.css de nuestros iconos.
    6. Una vez importamos nuestra carpeta fonts y nuestro archivo style.css que nos deja la descarga de icomoon a nuestro 
    proyecto, procedemos a importarla al main.jsx como si fuera un archivo css normal

    
## CREAR COMPONENTE CARD EN EL PROYECTO:
    Videos Vistos:
        1. https://www.youtube.com/watch?v=s4q48sG7zqY --> Utilizar las tarjetas
        2. https://www.youtube.com/watch?v=8QoPPBAsjXs --> Crea componente en filas y responsive





