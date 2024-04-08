import {Router} from "express";
const routerCategorias = Router();

import { createCategoria, getCategorias, updateCategoria, deleteCategoria } from "../controller/Categorias.js";

// PETICIONES GET
routerCategorias.get('/getCategorias', getCategorias);
// PETICIONES POST
routerCategorias.post('/createCategoria', createCategoria);
// PETICIONES PUT
routerCategorias.put('/updateCategoria/:categoriaId', updateCategoria);
// PETICIONES DELETE
routerCategorias.delete('/deleteCategoria/:categoriaId', deleteCategoria);

export default routerCategorias;