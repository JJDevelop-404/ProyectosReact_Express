import axios from "axios";

// Funcion para obtener mesero por id
//GetMeserosId --> Obtener Mesero por Id
export const getMeseroId = async (id) => {
    const Mesero = await axios.get(`${import.meta.env.VITE_BACK_URL}/usuarios/getUsuario/${id}`);
    return Mesero.data;
}
