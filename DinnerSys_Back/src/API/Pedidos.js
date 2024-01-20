import axios from "axios";
import { BACK_URL } from "../utils/Constants";

//GetPedidosXMesaId --> Obtener todos los pedidos de una mesa
export const getPedidoDeUnaMesa = async (MesaId) => {
    try {
        const lstPedidosXMesa = await axios.get(`${BACK_URL}/pedidos/getPedidosXMesaId/${MesaId}`);
        if(lstPedidosXMesa.status === 200){
            return lstPedidosXMesa.data;
        }
    } catch (error) {
        console.log(error);
    }
}