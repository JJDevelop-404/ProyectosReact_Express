import { Router } from 'express';
const routerProductos = Router();

import { createProducto, deleteProducto, getProductoById, getProductos, updateProducto}  from '../controller/Productos.js';

routerProductos.get('/getProductos', getProductos);
routerProductos.get('/getProducto/:ProductoId', getProductoById);
routerProductos.post('/createProducto', createProducto);
routerProductos.put('/updateProducto/:ProductoId', updateProducto);
routerProductos.delete('/deleteProducto/:ProductoId', deleteProducto);

export default routerProductos;