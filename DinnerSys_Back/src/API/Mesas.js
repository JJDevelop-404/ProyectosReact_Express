import axios from 'axios';
import { BACK_URL } from "../utils/Constants";

//GetMesasByMesero --> Obtener todas las mesas que tiene un Mesero
// export const getMesasByMesero = async (MeseroId) => {
//     try {
//         const MesasByMesero = await axios.get(`${BACK_URL}/mesas/getMesasByMesero/${MeseroId}`);
//         if(MesasByMesero.status === 200){
//             return MesasByMesero.data;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getMesas = async () => { 
    try {
        const Mesas = await axios.get(`${BACK_URL}/mesas/getMesas`);
        return Mesas.status === 200 ? Mesas.data : [];
    } catch (error) {
        console.log(error);
    }
};

//LiberarMesa --> Para liberar una mesa y poner que tiene 0 clientes
export const LiberarMesa = async (MesaId) => {
    const isLiberada = await axios.put(`${BACK_URL}/mesas/liberarMesa/${MesaId}`);
    return isLiberada.status === 201 ? isLiberada.data : false;
}