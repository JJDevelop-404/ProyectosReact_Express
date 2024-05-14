import { Navigate, useLocation } from "react-router-dom";
import CrearProducto from "./CrearProducto";

export default function ModificarProducto() {

    const titulo = {
        EncabezadoFormulario: 'Modificar Producto',
        BotonSubmit: 'Guardar Cambios',
    }

    const location = useLocation(); //El useLocation funciona para obtener lo que se manda desde un navigate
    const producto = location.state; //Esto es para obtener el producto que se envia desde el componente ListarProductos en el navigate

    const dataProducto = {
        productoId: producto?.ProductoId,
        nombre: producto?.Nombre,
        descripcion: producto?.Descripcion,
        precio: producto?.Precio,
        fileUrl_imagen: producto?.URLImagen
    }

    console.log(dataProducto);

    if (producto !== null) {
        return (
            <CrearProducto titulo={titulo} producto={dataProducto} accion={'modificar'} />
        );
    } else {
        return <Navigate to='/admin/productos' />
    }


}
