import axios from "axios";
import { BACK_URL } from "../utils/Constants";


//  PETICIONES PARA USUARIOS

// GET
export const obtenerUsuarios = async () => {
    try {
        const Usuarios = await axios.get(`${BACK_URL}/usuarios/getUsuarios`);
        return Usuarios.status === 200 ? Usuarios.data : [];
    } catch (error) {
        console.log(error);
    }
};

// Funcion para verificar los datos de loggin
export const VerifyLoggin = async (usuario, clave) => {
    try {
        const Mesero = await axios.post(`${BACK_URL}/usuarios/loggin`, { usuario: usuario, clave: clave });
        return Mesero.status === 200 ? Mesero.data : null;
    } catch (error) {
        console.log(error);
    }
}
