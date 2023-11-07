import './Navbar.css';
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
    const { isAuthenticated, setIsAuthenticated, UserId, Rol } = useAuth();

    const onHandleSubmit = () => {
        // Funcion para: Cerrar Sesión
        setIsAuthenticated(false);
    }

    if (isAuthenticated && Rol === "administrador") {
        // Navbar para el Administrador
        return (
            <div>
                <nav className="navbar">
                    <ul className="ul-navbar">
                        <li> <a href='/Admin/Empleados' > Empleados </a> </li>
                        <li className="li-button"> <a onClick={onHandleSubmit}> Cerrar Sesión </a> </li>
                    </ul>
                </nav>
                <div className="content">
                </div>
            </div>
        )
    } else if (isAuthenticated && Rol === "mesero") {
        // Navbar para el Mesero
        return (
            <div>
                <nav className="navbar">
                    <ul className="ul-navbar">
                        <li> <a href={`/Mesero/${UserId}/Home`}> Perfil </a> </li>
                        <li > <a href={`/Mesero/${UserId}`}> Mesas </a> </li>
                        <li> <a href={`/Mesero/${UserId}/PedidosRealizados`}> Pedidos Realizados </a> </li>
                        <li className='li-button'> <a onClick={onHandleSubmit}> Cerrar Sesión </a> </li>
                    </ul>
                </nav>
                <div className="content">
                </div>
            </div>
        )
    }
    //Puedo hacerte preguntas por acá?
    //Si, dime
    //Cómo podría yo crear un token?
    // Cómo es la estructura de un token?
    // Es un string que tiene un formato de JSON
    // Me podrias dar un ejemplo?
    // Claro, mira:
    // {
    //     "id": 1,
    //     "nombre": "Juan",
    //     "apellido": "Perez",
    //     "correo": "juanperez@gmail",
    //     "clave": "123456",
    //     "rol": "mesero"
    // }
    //Pero ese JSON para enviarlo como un token y acceder a los valores, cómo lo hago?
    // El token se envia en el header de la petición HTTP
    // Y cómo lo hago?
    // El header es un objeto que tiene un atributo llamado Authorization
    // Y el valor de ese atributo es el token
    // Y cómo lo envío?
    // Con el método fetch
    // Y cómo lo recibo?
    // En el backend

    //Me podrias mostrar como es un token? o sea, como se ve?
    // Claro, mira:
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiSnVhbiIsImFwZWxsaWRvIjoiUGVyZXoiLCJjb3JyZW8iOiJqdWFucGVyZXoiLCJjbGF2ZSI6IjEyMzQ1NiIsInJvbCI6Im1lc2VybyIsImlhdCI6MTYyMzg0MzY3Mn0.3U0l0zLp1L3Zf4dQlYvz6oF0fGw7WQ4Z6Z1Zp3K0ZiA
    //Y digamos, yo como accedo a un valor de ese token?
    // El token se decodifica en el backend
    // Y cómo lo decodifico?
    // Con la librería jsonwebtoken
    // Y cómo lo uso?
    // Primero, lo instalas con npm i jsonwebtoken
    //No que no sabias de los token?
    //Bueno, continua
    // Y luego, importas la librería en el backend
    // Y luego, usas la función verify
    // Y que hace la función verify?
    // Decodifica el token
    // Y cómo lo uso?
    // Mira:
    // const jwt = require('jsonwebtoken');
    // const token = req.headers.authorization;
    // const decoded = jwt.verify(token, 'secret');
    // Y que hace el decoded?
    // Decodifica el token
    // Y cómo accedo a los valores del token?
    // Mira:
    // decoded.id
    // decoded.nombre
    // decoded.apellido
    //Entiendo, pero digamos, supongamos que tengo mi función Login, consulto a la base de datos y verifico si los campos son correctos, y para enviar el usuario que se logueo como un token, cómo lo hago?
    // Mira:
    // const jwt = require('jsonwebtoken');
    // const token = jwt.sign({
    //     id: usuario.id,
    //     nombre: usuario.nombre,
    //     apellido: usuario.apellido,
    //     correo: usuario.correo,
    //     clave: usuario.clave,
    //     rol: usuario.rol
    // }, 'secret');
    //Y eso lo mando desde el back tipo asi:
    // const user = req.body;
    // if(user.nombre === nombreEnBd && user.clave === claveBd){
    //     const token = jwt.sign({
    //         id: usuario.id,
    //         nombre: usuario.nombre,
    //         apellido: usuario.apellido,
    //         correo: usuario.correo,
    //         clave: usuario.clave,
    //         rol: usuario.rol
    //     }, 'secret');
    //     res.json({
    //         token
    //     });
    // Y en el front, como se recibe? estoy usando axios
    // Mira:
    // const res = await axios.post('http://localhost:5000/login', {
    //     nombre: nombre,
    //     clave: clave
    // });
    // Y si el .then es un 200, entonces guardo el token en el localStorage
    // Y si el .then es un 400, entonces muestro un mensaje de error
    // Y como lo guardo en el localStorage?
    // Mira:
    // localStorage.setItem('token', res.data.token);
    //Y si digamos, yo dentro de mi front, quiero usar datos de ese token, como lo hago?
    // Mira:
    // const token = localStorage.getItem('token');
    // const decoded = jwt.verify(token, 'secret');
    // Y ya con eso, ya tienes los datos del token
    // Y como los uso?
    // Mira:
    // decoded.id
    // decoded.nombre
    // decoded.apellido
    // decoded.correo
    // decoded.clave
    // decoded.rol
    // Pero eso no da seguridad, porque cualquiera podria acceder a la consola y usarlo no?
    // Si, pero es lo que hay 
    // Y como lo puedo hacer seguro?
    // Con el localStorage
    // Y como lo hago?
    // Mira:
    // localStorage.setItem('token', res.data.token);
    // Y eso lo guardas en el .then
    // Y como lo uso?
    // Mira:
    // const token = localStorage.getItem('token');
    //Pero, ese token se ve en el localStorage?
    // Y como lo suelen usar las paginas web?
    // Mira:
    // localStorage.setItem('token', res.data.token);
    // Y eso lo guardas en el .then
    // Y si es seguro?
    // Si, es seguro
    // Y como se suelen usar los datos de ese token?
    // Mira:
    // Pero no hay una forma de hacer que el token no se vea en el localStorage?
    // Si, hay una forma
    // Y como es?
    // Mira:




}
