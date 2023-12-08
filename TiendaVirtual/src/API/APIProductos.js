import { BACK_URL } from '../Utils/conection'; // Importamos la ruta raiz del backend
import axios from 'axios'; // Importamos axios para realizar peticiones HTTP

// Funcion para obtener todos los productos 
export const MostrarProductos = async () => {
    try {
        const response = await axios.get(`${BACK_URL}/productos/getProductos`); // Realizamos la peticion GET 
        if (response.status === 200) {
            return response.data; // Si la peticion es exitosa, retornamos la respuesta del servidor
        }
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}

// Funcion para agregar un nuevo producto
export const AgregarProducto = async (producto) => {
    try {
        const response = await axios.post(`${BACK_URL}/productos/createProducto`, producto); // Realizamos la peticion POST
        if (response.status === 201) {
            return response.data; // Retornamos la respuesta del servidor
        }
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}

// Funcion para modificar un producto
export const ModificarProducto = async (newProducto, id) => {
    try {
        const response = await axios.put(`${BACK_URL}/productos/updateProducto/${id}`, newProducto); // Realizamos la peticion PUT
        if (response.status === 201) {
            return response.data; // Si la peticion es exitosa, retornamos la respuesta del servidor
        }
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}