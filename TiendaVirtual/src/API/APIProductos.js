import { api } from '../Utils/conection'; // Importamos la ruta raiz del backend

// Funcion para obtener todos los productos 
export const MostrarProductos = async () => {
    try {
        const response = await api.get(`/productos/getProductos`); // Realizamos la peticion GET 
        return response.status === 200 ? response.data : [];
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}

// Funcion para agregar un nuevo producto
export const AgregarProducto = async (producto) => {
    try {
        const response = await api.post(`/productos/createProducto`, producto); // Realizamos la peticion POST
        return response.status === 201 ? response.data : null;
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}

// Funcion para modificar un producto
export const ModificarProducto = async (newProducto, id) => {
    try {
        const response = await api.put(`/productos/updateProducto/${id}`, newProducto); // Realizamos la peticion PUT
        return response.status === 201 ? response.data : null;
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}