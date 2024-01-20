import { Router } from 'express';
const routerPedidos = Router();

import { getPedidos, getPedidoXMesaId } from '../controller/Pedidos.js';

routerPedidos.get('/getPedidos', getPedidos);
routerPedidos.get('/getPedidosXMesaId/:MesaId', getPedidoXMesaId);

export default routerPedidos;