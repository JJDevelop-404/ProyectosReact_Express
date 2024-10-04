import axios from 'axios';

// getCategorias --> Funcion para obtener todas las categorias
export const getCategorias = async () => {
    try {
        const categorias = await axios.get(`${import.meta.env.VITE_BACK_URL}/categorias/getCategorias`);
        return categorias.status === 200 ? categorias.data : null;
    } catch (error) {
        console.error(error);
    }
}

// nuevaCategoria --> Funcion para crear una nueva categoria
export const nuevaCategoria = async (objCategoria) => { 
    try {
        const isInsert = await axios.post(`${import.meta.env.VITE_BACK_URL}/categorias/createCategoria`, objCategoria);
        return isInsert.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

// modificarCategoria --> Funcion para modificar una categoria existente
export const modificarCategoria = async (categoriaId, objCategoria) => {
    try {
        const isEdit = await axios.put(`${import.meta.env.VITE_BACK_URL}/categorias/updateCategoria/${categoriaId}`, objCategoria);
        return isEdit.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};

// eliminarCategoria --> Funcion para eliminar una categoria existente
export const eliminarCategoria = async (categoriaId) => {
    try {
        const isDelete = await axios.delete(`${import.meta.env.VITE_BACK_URL}/categorias/deleteCategoria/${categoriaId}`);
        return isDelete.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
    }
};