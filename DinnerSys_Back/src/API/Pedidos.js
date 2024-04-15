import axios from "axios";
import { BACK_URL } from "../utils/Constants";


//GetPedidos --> Obtener todos los pedidos
export const getPedidos = async () => { 
    try {
        const pedido = await axios.get(`${BACK_URL}/pedidos/getPedidos`);
        return pedido.status === 200 ? pedido.data : null;
    } catch (error) {
        console.log(error);
    }
};

//GetPedidosXMeseroId --> Obtener todos los pedidos de un mesero en el dia actual
export const getPedidosXMeseroId = async (meseroId) => {
    try {
        const lstPedidosXMesa = await axios.get(`${BACK_URL}/pedidos/getPedidosXMeseroId/${meseroId}`);
        return lstPedidosXMesa.status === 200 ? lstPedidosXMesa.data : null;
    } catch (error) {
        console.log(error);
    }
}

//nuevoPedido --> Crear un nuevo pedido
export const nuevoPedido = async (MesaId, MeseroId, lstProductos) => { 
    try {
        const isInsert = await axios.post(`${BACK_URL}/pedidos/createPedido`, { MesaId, MeseroId, lstProductos });
        return isInsert.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

//modificarPedido --> Actualizar un pedido
export const modificarPedido = async (pedidoId, lstProductos) => { 
    try {
        const isUpdate = await axios.put(`${BACK_URL}/pedidos/updatePedido/${pedidoId}`, { lstProductos });
        return isUpdate.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};