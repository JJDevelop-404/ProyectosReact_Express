import { Router } from 'express';
const routerUsuario = Router();

import {getUsuarios, getUsuarioById,getMeseros, verificarCredenciales, 
    createUsuario, updateUsuario, deleteUsuario} from '../controller/Usuarios.js';

routerUsuario.get('/getUsuarios', getUsuarios);
routerUsuario.get('/getUsuario/:id', getUsuarioById);
routerUsuario.get('/getMeseros', getMeseros);
routerUsuario.post('/loggin', verificarCredenciales);
routerUsuario.post('/createUsuario', createUsuario);
routerUsuario.put('/updateUsuario/:UsuarioId', updateUsuario);
routerUsuario.delete('/deleteUsuario/:UsuarioId', deleteUsuario);

export default routerUsuario;