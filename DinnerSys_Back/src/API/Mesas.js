import axios from 'axios';
import { BACK_URL } from "../utils/Constants";

//GetMesasByMesero --> Obtener todas las mesas que tiene un Mesero
export const getMesasByMesero = async (MeseroId) => {
    try {
        const MesasByMesero = await axios.get(`${BACK_URL}/mesas/getMesasByMesero/${MeseroId}`);
        if(MesasByMesero.status === 200){
            return MesasByMesero.data;
        }
    } catch (error) {
        console.log(error);
    }
}

//LiberarMesa --> Para liberar una mesa y poner que tiene 0 clientes
export const LiberarMesa = async (MesaId, MeseroId) => {
    const isLiberada = await axios.put(`${BACK_URL}/mesas/liberarMesa`, { MesaId: MesaId, MsroId: MeseroId })
    return isLiberada.data;
}