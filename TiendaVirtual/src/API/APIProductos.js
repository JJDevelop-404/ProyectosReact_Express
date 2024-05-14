import { BACK_URL } from '../Utils/conection'; // Importamos la ruta raiz del backend
import axios from 'axios'; // Importamos axios para realizar peticiones HTTP

axios.defaults.withCredentials = true; // Para enviar cookies al servidor

// Funcion para obtener todos los productos 
export const MostrarProductos = async () => {
    try {
        const response = await axios.get(`${BACK_URL}/productos/getProductos`); // Realizamos la peticion GET 
        return response.status === 200 ? response.data : [];
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}

// Funcion para agregar un nuevo producto
export const AgregarProducto = async (producto) => {
    try {
        const response = await axios.post(`${BACK_URL}/productos/createProducto`, producto); // Realizamos la peticion POST
        return response.status === 201 ? response.data : null;
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}

// Funcion para modificar un producto
export const ModificarProducto = async (newProducto, id) => {
    try {
        const response = await axios.put(`${BACK_URL}/productos/updateProducto/${id}`, newProducto); // Realizamos la peticion PUT
        return response.status === 201 ? response.data : null;
    } catch (error) {
        console.log(error); // En caso de error, lo mostramos en consola
    }
}