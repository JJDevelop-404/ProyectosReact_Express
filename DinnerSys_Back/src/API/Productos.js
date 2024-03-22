import axios from "axios";
import { BACK_URL } from "../utils/Constants";

//GetProductos --> Obtener Todos Los Productos
export const getProductos = async () => {
    try {
        const lstProductos = await axios.get(`${BACK_URL}/productos/getProductos`);
        if (lstProductos.status === 200) {
            return lstProductos.data;
        }
    } catch (error) {
        console.log(error);
    }
}

//nuevoProducto --> Crear un nuevo producto
export const nuevoProducto = async (objProducto) => {
    if(objProducto.Precio.includes(',')){
        objProducto.Precio = objProducto.Precio.replace(',', '');
    }else if(objProducto.Precio.includes('.')){
        objProducto.Precio = objProducto.Precio.replace('.','');
    }
    try {
        const isInsert = await axios.post(`${BACK_URL}/productos/createProducto`, objProducto);
        return isInsert.status === 201 ? true : false;
    } catch (error) {
        console.log(error.message);
    }
};

//modificatProducto --> Modificar un producto por su id
export const modificarProducto = async (productoId, objProducto) => {
    console.log(productoId, objProducto);
    if(objProducto.Precio.includes(',')){
        objProducto.Precio = objProducto.Precio.replace(',', '');
    }else if(objProducto.Precio.includes('.')){
        objProducto.Precio = objProducto.Precio.replace('.','');
    }
    
    try {
        const isEdit = await axios.put(`${BACK_URL}/productos/updateProducto/${productoId}`, objProducto);
        return isEdit.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};


//inactivarProducto --> Inactiva un producto 
export const inactivarProducto = async (productoId) => { 
    try {
        const isDelete = await axios.delete(`${BACK_URL}/productos/deleteProducto/${productoId}`);
        return isDelete.status === 201 ? true : false;
    } catch (error) {
        console.log(error);
    }
};