import axios from "axios";
import { BACK_URL } from "../utils/Constants";

//GetProductos --> Obtener Todos Los Productos
export const getProductos = async () => {
    try {
        const lstProductos = await axios.get(`${BACK_URL}/productos/getProductos`);
        if(lstProductos.status === 200){
            return lstProductos.data;
        }
    } catch (error) {
        console.log(error);
    }
}