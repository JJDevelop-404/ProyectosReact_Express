import { Router } from 'express';
import { getUsuarioById, getUsuarios, verificarUsuario } from '../controller/Usuarios.js';

export const routerUsuarios = Router();

routerUsuarios.post('/VerificarUsuario', verificarUsuario); //Verificar usuario / para Login
routerUsuarios.get('/getUsuarios', getUsuarios); //Traer todos los usuarios
routerUsuarios.get('/getUsuarioById/:IdUsuario', getUsuarioById); //Traer usuario por id los : son para parametros de la URL, asi los llamaremos en el controlador

