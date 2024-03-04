import { Router } from 'express';
const routerProductos = Router();

import { createProducto, deleteProducto, getProductoById, getProductos, updateProducto}  from '../controller/Productos.js';
//Todas las rutas de productos
//PETICIONES GET
routerProductos.get('/getProductos', getProductos); //Traer todos los productos que esten activos
routerProductos.get('/getProducto/:ProductoId', getProductoById); //Traer un producto por su id
//PETICIONES POST
routerProductos.post('/createProducto', createProducto); //Para crear un producto
//PETICIONES PUT
routerProductos.put('/updateProducto/:ProductoId', updateProducto); //Para actualizar un producto
//PETICIONES DELETE
routerProductos.delete('/deleteProducto/:ProductoId', deleteProducto); //Actualiza el producto mandandole a inactivo el campo 1

export default routerProductos;