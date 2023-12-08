// AQUI IRAN LAS RUTAS DE PRODUCTOS
import { Router } from 'express';

import { getProductos, createProducto, updateProducto } from '../controller/Productos.js';
import {multerMiddleware} from '../middlewares/multerMiddleware.js';

const routerProductos = Router();

// El multerMiddleware lo que nos sirve es para el manejo de imagenes, para que este las pueda subir al servidor y demás 
routerProductos.get('/getProductos', getProductos);
routerProductos.post('/createProducto', multerMiddleware, createProducto);
routerProductos.put('/updateProducto/:ProductoId', multerMiddleware, updateProducto);
// routerProductos.post('/nuevoProducto', multerMiddleware, nuevoProducto);


export { routerProductos };


