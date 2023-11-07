import { Router } from 'express';
const routerUsuario = Router();

import {getUsuarios, getUsuarioById,getMeseros, verificarCredenciales, 
    createUsuario, updateUsuario, deleteUsuario} from '../controller/Usuario.js';

routerUsuario.get('/getAll', getUsuarios);
routerUsuario.get('/get/:id', getUsuarioById);
routerUsuario.get('/getMeseros', getMeseros);
routerUsuario.post('/loggin', verificarCredenciales);
routerUsuario.post('/createUsuario', createUsuario);
routerUsuario.put('/updateUsuario/:UsuarioId', updateUsuario);
routerUsuario.delete('/deleteUsuario/:UsuarioId', deleteUsuario);

export default routerUsuario;