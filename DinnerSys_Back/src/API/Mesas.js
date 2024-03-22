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


// POST
//nuevaMesa --> Para crear una nueva mesa
export const nuevaMesa = async () => {
    try {
        const isInsert = await axios.post(`${BACK_URL}/mesas/createMesa`);
        return isInsert.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

// PUT
//LiberarMesa --> Para liberar una mesa y cambiar su estado a 0
export const LiberarMesa = async (MesaId) => {
    try {
        const isLiberada = await axios.put(`${BACK_URL}/mesas/liberarMesa/${MesaId}`);
        return isLiberada.status === 201 ? isLiberada.data : false;
    } catch (error) {
        console.log(error);
    }
}