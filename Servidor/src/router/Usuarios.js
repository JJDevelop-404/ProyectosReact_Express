import { Router } from 'express';
const routerUsuario = Router();

import { getUsuarios, getUsuarioById, getMeseros, verificarCredenciales, createUsuario, updateUsuario, deleteUsuario } from '../controller/Usuarios.js';

//Todas las rutas de usuarios
//PETICIONES POST
routerUsuario.post('/loggin', verificarCredenciales); //Vetifica credenciales para el loggin
routerUsuario.post('/createUsuario', createUsuario); //Crea un usuario
//PETICIONES GET
routerUsuario.get('/getUsuarios', getUsuarios); //Trae todos los usuarios que esten activos
routerUsuario.get('/getUsuario/:id', getUsuarioById); //Trae un usaario por su id
routerUsuario.get('/getMeseros', getMeseros); //Trae todos los meseros que esten activos
//PETICIONES PUT
routerUsuario.put('/updateUsuario/:UsuarioId', updateUsuario); //Actualiza un usuario
//PETICIONES DELETE
routerUsuario.delete('/deleteUsuario/:UsuarioId', deleteUsuario); //Actualiza un usuario. inactivo = 1

export default routerUsuario;