import Tabla, { alertEliminar } from '../../../components/Tabla.jsx';
import { useEffect, useState } from 'react';
import './ListarProductos.css';
import { getProductos, inactivarProducto } from '../../../API/Productos.js';
import { alertaCrearEditar } from '../../../components/FormCrearEditar.jsx';

export default function ListarProductos() {
    const [Productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos()
            .then((response) => {
                if (response) {
                    setProductos(response);
                } else {
                    console.log("Error al obtener productos");
                    alert("Error al obtener productos");
                }
            })
    }, [])

    const onEliminarProducto = (productoId) => {
        inactivarProducto(productoId)
            .then((response) => {
                if (response) {
                    alertEliminar('Producto eliminado correctamente', 
                        'success', 
                        setProductos(Productos.filter((pr) => pr.ProductoId !== productoId)));
                }else{
                    alertEliminar('Error al eliminar el producto',
                        'error');
                }
            })
    }

    const [Titulos] = useState(['ID', 'Nombre', 'Descripcion', 'Categoria', 'Precio']);


    return (
        <>
            <Tabla NombreEntidad={'Productos'} lstTitulosTabla={Titulos} lstDataEntidad={Productos}
                FuncionBtnEliminar={onEliminarProducto}
                RedireccionBotonCrear={'/Admin/Productos/NuevoProducto'} RedireccionBtnEditar={'/Admin/Productos/EditarProducto'}
            />
        </>
    )

    //Modulo unidad decena centena mil
    function impresionPrecioUnidadDecenaCentena(num) {
        let precioDef = num.toString(); // Convertir el número a una cadena

        let precioNew = []; // Array para almacenar los caracteres formateados

        let contador = 0; // Contador para rastrear los dígitos

        // Recorrer la cadena del final al principio
        for (let i = precioDef.length - 1; i >= 0; i--) {
            // Agregar el dígito actual al principio del array
            precioNew.unshift(precioDef[i]);
            contador++;

            // Agregar un punto cada tres dígitos
            if (contador === 3 && i !== 0) {
                precioNew.unshift('.');
                contador = 0; // Reiniciar el contador después de agregar un punto
            }
        }

        // Unir los caracteres en una cadena y devolverla
        return precioNew.join('');
    }

}

