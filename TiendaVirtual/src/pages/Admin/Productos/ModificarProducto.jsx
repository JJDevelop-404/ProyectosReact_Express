import { Navigate, useLocation } from "react-router-dom";
import CrearProducto from "./CrearProducto";

export default function ModificarProducto({ producto }) {

    const titulo = {
        EncabezadoFormulario: 'Modificar Producto',
        BotonSubmit: 'Guardar Cambios',
    }


    const location = useLocation(); //El useLocation funciona para obtener lo que se manda desde un navigate
    producto = location.state; //Esto es para obtener el producto que se envia desde el componente ListarProductos en el navigate

    if (producto !== null) {
        return (
            <CrearProducto titulo={titulo} producto={producto} accion={'modificar'} />
        );
    } else {
        return <Navigate to='/admin/productos' />
    }


}
