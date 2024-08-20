import { useLocation, useNavigate } from "react-router-dom";
import CrearProducto from "./CrearProducto";
import { alertaToast } from "../../../Utils/alertas";

export default function ModificarProducto() {
    const navigate = useNavigate();
    const location = useLocation(); //El useLocation funciona para obtener lo que se manda desde un navigate
    let producto = location.state; //Esto es para obtener el producto que se envia desde el componente ListarProductos en el navigate

    if (!producto) {
        alertaToast({ titulo: 'No se recibio un producto', funcion: () => navigate('/admin/productos') });
    } else {
        producto = {
            productoId: producto.ProductoId,
            nombre: producto.Nombre,
            descripcion: producto.Descripcion,
            precio: producto.Precio,
            fileUrl_imagen: producto.URLImagen
        }
    }

    return (
        <CrearProducto producto={producto} accion={'modificar'} />

    );


}
