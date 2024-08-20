import { api, errorReturn } from '../Utils/conection.js';
import { encrypt } from '../Utils/encriptacion.js';

export const login = async (usuario) => {
    try {
        const login = await api.post(`/usuarios/VerificarUsuario`, usuario);
        console.log(login.data.userSet);
        const dataUsuario = {
            Nombre: encrypt(login.data.userSet.Nombre),
            Rol: encrypt(login.data.userSet.Rol.toLowerCase())
        }
        return login.status === 200 ? dataUsuario : null;
    } catch (error) {
        console.log(error);
        throw errorReturn(error);
    }
};

export const logout = async () => {
    try {
        const isLogout = await api.get(`/usuarios/logout`);
        return isLogout.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        throw errorReturn(error);

    }
};

export const getUsuarios = async () => {
    try {
        const usuarios = await api.get(`/usuarios/getUsuarios`);
        return usuarios.status === 200 ? usuarios.data : [];
    } catch (error) {
        console.log(error);
        throw errorReturn(error);

    }
};