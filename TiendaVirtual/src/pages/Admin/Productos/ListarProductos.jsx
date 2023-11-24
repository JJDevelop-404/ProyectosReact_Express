import { useEffect, useState } from "react"
import { MostrarProductos } from "../../../API/APIProductos";
import { useNavigate } from 'react-router-dom';
import './styles/ListarProductos.css';
import ModificarProducto from "./ModificarProducto";


export default function ListarProductos() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        MostrarProductos()
            .then((response) => {
                console.log(response);
                if (response.length > 0) {
                    setProductos(response);
                }
            }).catch((error) => {
                alert("No se pudo traer los productos");
                console.log("Error al traer los productos ", error);
            })
    }, [])

    const onHandleClickEdit = (producto) => {
        return navigate(`/admin/productos/${producto.ProductoId}`, {state: producto});
        //El {state: producto} es para enviar el producto al componente ModificarProducto
    }

    return (
        <div className="lst-productos d-flex justify-content-center align-items-center">
            <div className="table-responsive">
                <h1 className="title-basic">Lista de Productos</h1>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Referencia</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {productos.map((producto) => (
                            <tr key={producto.ProductoId}>
                                <td scope="row">{producto.ProductoId}</td>
                                <td>{producto.Nombre}</td>
                                <td>{producto.Descripcion}</td>
                                <td>{producto.Precio}</td>
                                <td><img className="img-tillas" src={producto.URLImagen} /> </td>
                                <td> <button className="btn btn-primary" onClick={()=>onHandleClickEdit(producto)}>Editar</button> <button className="btn btn-danger"> Borrar </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
