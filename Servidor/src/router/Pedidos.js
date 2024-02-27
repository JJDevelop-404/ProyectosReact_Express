import { Router } from 'express';
const routerPedidos = Router();

import { createPedido, getPedidos, getPedidoXMesaId } from '../controller/Pedidos.js';

//GET 
routerPedidos.get('/getPedidos', getPedidos);
routerPedidos.get('/getPedidosXMesaId/:MesaId', getPedidoXMesaId);
//POST
routerPedidos.post('/createPedido', createPedido);

export default routerPedidos;