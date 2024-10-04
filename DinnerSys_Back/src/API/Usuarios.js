import axios from "axios";

//  PETICIONES PARA USUARIOS
// GET
// Funcion para verificar los datos de loggin
export const VerifyLoggin = async (usuario, clave) => {
    console.log(import.meta.env.VITE_BACK_URL)
    try {
        const Mesero = await axios.post(`${import.meta.env.VITE_BACK_URL}/usuarios/loggin`, { usuario: usuario, clave: clave });
        return Mesero.status === 200 ? Mesero.data : null;
    } catch (error) {
        console.log(error);
    }
}

// Funcion para obtener los datos de todos los usuarios
export const obtenerUsuarios = async () => {
    try {
        const Usuarios = await axios.get(`${import.meta.env.VITE_BACK_URL}/usuarios/getUsuarios`);
        return Usuarios.status === 200 ? Usuarios.data : [];
    } catch (error) {
        console.log(error);
    }
};

// POST

//Funcion para crear un usuario
export const nuevoUsuario = async (usuario) => { 
    try {
        const isInsert = await axios.post(`${import.meta.env.VITE_BACK_URL}/usuarios/createUsuario`, usuario);
        return isInsert.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

// PUT

//Funcion para actualizar un usuario
export const modificarUsuario = async (UsuarioId, Usuario) => { 
    try {
        const isModify = await axios.put(`${import.meta.env.VITE_BACK_URL}/usuarios/updateUsuario/${UsuarioId}`, Usuario);
        return isModify.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

// DELETE

// Funcion para inactivar un usuario
export const inactivarUsuario = async (usuarioId) => { 
    try {
        const isDelete = await axios.delete(`${import.meta.env.VITE_BACK_URL}/usuarios/deleteUsuario/${usuarioId}`);
        return isDelete.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};