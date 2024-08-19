import { Router } from 'express';
import { CierreSesion, crearUsuario, deleteUsuario, getUsuarios, updateInfoAccesoUsuario, updateInfoUsuario, verificarUsuario } from '../controller/Usuarios.js';
import { userAuth, userAuthRole } from '../middlewares/authenticationMiddleware.js';

const routerUsuarios = Router();

routerUsuarios.post('/VerificarUsuario', verificarUsuario); //Verificar usuario / para Login
routerUsuarios.get('/logout', userAuth, CierreSesion); //Cerrar sesion
routerUsuarios.get('/getUsuarios', userAuth, userAuthRole(['administrador']), getUsuarios); //Traer todos los usuarios
routerUsuarios.post('/createUsuario', userAuth, userAuthRole(['administrador']), crearUsuario);//Crear usuario
routerUsuarios.put('/updateInfoUsuario/:IdUsuario', userAuth, userAuthRole(['administrador']), updateInfoUsuario); //Actualizar informacion basica del usuario
routerUsuarios.put('/updateInfoAccesoUsuario/:IdUsuario', userAuth, userAuthRole(['administrador']), updateInfoAccesoUsuario); //Actualizar credenciales del usuario
routerUsuarios.delete('/deleteUsuario/:IdUsuario', userAuth, userAuthRole(['administrador']), deleteUsuario); //Eliminar usuario

export { routerUsuarios };