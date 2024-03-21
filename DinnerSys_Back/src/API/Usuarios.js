import axios from "axios";
import { BACK_URL } from "../utils/Constants";


//  PETICIONES PARA USUARIOS

// GET

// Funcion para verificar los datos de loggin
export const VerifyLoggin = async (usuario, clave) => {
    try {
        const Mesero = await axios.post(`${BACK_URL}/usuarios/loggin`, { usuario: usuario, clave: clave });
        return Mesero.status === 200 ? Mesero.data : null;
    } catch (error) {
        console.log(error);
    }
}

// Funcion para obtener los datos de todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const Usuarios = await axios.get(`${BACK_URL}/usuarios/getUsuarios`);
        return Usuarios.status === 200 ? Usuarios.data : [];
    } catch (error) {
        console.log(error);
    }
};

//Funcion para actualizar un usuario
export const modificarUsuario = async (UsuarioId, Usuario) => { 
    try {
        const isModify = await axios.put(`${BACK_URL}/usuarios/updateUsuario/${UsuarioId}`, Usuario);
        return isModify.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

// Funcion para inactivar un usuario
export const inactivarUsuario = async (usuarioId) => { 
    try {
        const isDelete = await axios.delete(`${BACK_URL}/usuarios/deleteUsuario/${usuarioId}`);
        return isDelete.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};