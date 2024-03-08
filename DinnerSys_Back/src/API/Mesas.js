import axios from 'axios';
import { BACK_URL } from "../utils/Constants";

// PETICIONES PARA MESAS
// GET
// obtenerMesas --> Para obtener todas las mesas
export const obtenerMesas = async () => { 
    try {
        const Mesas = await axios.get(`${BACK_URL}/mesas/getMesas`);
        return Mesas.status === 200 ? Mesas.data : [];
    } catch (error) {
        console.log(error);
    }
};


// PUT
//LiberarMesa --> Para liberar una mesa y poner que tiene 0 clientes
export const LiberarMesa = async (MesaId) => {
    try {
        const isLiberada = await axios.put(`${BACK_URL}/mesas/liberarMesa/${MesaId}`);
        return isLiberada.status === 201 ? isLiberada.data : false;
    } catch (error) {
        console.log(error);
    }
}