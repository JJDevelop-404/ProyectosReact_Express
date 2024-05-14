import axios from 'axios';
import { BACK_URL } from '../Utils/conection.js';

axios.defaults.withCredentials = true;

export const login = async (usuario) => { 
    try {
        const login = await axios.post(`${BACK_URL}/usuarios/VerificarUsuario`, usuario);
        console.log(login.data);
        return login.status === 200 ? login.data : null;
    } catch (error) {
        console.log(error);
    }
};

export const getUsuarios = async () => { 
    try {
        const usuarios = await axios.get(`${BACK_URL}/usuarios/getUsuarios`);
        return usuarios.status === 200 ? usuarios.data : [];
    } catch (error) {
        console.log(error);
    }
};
