import { Router } from 'express';
const routerPedidos = Router();

import { agregarNuevosProductosAlPedido, createPedido, deletePedido, finalizarPedido, getPedidos, getPedidosDelDia, getPedidoXMeseroId, updatePedido } from '../controller/Pedidos.js';

//PETICIONES GET 
routerPedidos.get('/getPedidos', getPedidos); //Traer todos los pedidos
routerPedidos.get('/getPedidosXMeseroId/:MeseroId', getPedidoXMeseroId); //Traer todos los pedidos que se han echo en una mesa
routerPedidos.get('/getPedidosDia', getPedidosDelDia); //Trae los pedidos del dia
//PETICIONES POST
routerPedidos.post('/createPedido', createPedido); //Para crear un pedido
routerPedidos.post('/agregarAlPedido/:PedidoId', agregarNuevosProductosAlPedido); //Para agregar un producto a un pedido
//PETICIONES PUT
routerPedidos.put('/updatePedido/:PedidoId', updatePedido); //Para actualizar un pedido
routerPedidos.put('/finalizarPedido/:PedidoId', finalizarPedido); //Para finalizar un pedido
//PETICIONES DELETE
routerPedidos.delete('/deletePedido/:PedidoId', deletePedido); //Para eliminar un pedido

export default routerPedidos;