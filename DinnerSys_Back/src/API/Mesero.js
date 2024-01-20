import axios from "axios";
import { BACK_URL } from "../utils/Constants";

// Funcion para obtener mesero por id
//GetMeserosId --> Obtener Mesero por Id
export const getMeseroId = async (id) => {
    const Mesero = await axios.get(`${BACK_URL}/usuarios/getUsuario/${id}`);
    return Mesero.data;
}
