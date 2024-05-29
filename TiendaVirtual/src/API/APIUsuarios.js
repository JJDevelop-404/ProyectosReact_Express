import { api } from '../Utils/conection.js';

export const login = async (usuario) => {
    try {
        const login = await api.post(`/usuarios/VerificarUsuario`, usuario);
        console.log(login.data.userSet);
        return login.status === 200 ? login.data.userSet : null;
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    try {
        const isLogout = await api.get(`/usuarios/logout`);
        return isLogout.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

export const getUsuarios = async () => {
    try {
        const usuarios = await api.get(`/usuarios/getUsuarios`);
        return usuarios.status === 200 ? usuarios.data : [];
    } catch (error) {
        console.log(error);
    }
};
