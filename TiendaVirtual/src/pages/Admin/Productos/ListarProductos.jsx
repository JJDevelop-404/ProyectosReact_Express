import { useEffect, useState } from "react"
import { MostrarProductos } from "../../../API/APIProductos";
import TablaListar from "../../../components/TablaListar/TablaListar";
import { alertaToast } from "../../../Utils/alertas";
import './styles/ListarProductos.css';


export default function ListarProductos() {
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        MostrarProductos()
            .then((response) => {
                console.log(response);
                if (response.length > 0) {
                    setProductos(response);
                }
            }).catch((error) => {
                alertaToast({ titulo: 'Error al traer los productos', icon: 'error' });
                console.log("Error al traer los productos ", error);
            })
    }, [])

    const onHandleClickDelete = (idProducto) => {
        console.log(idProducto);
    }

    const [titlesTable] = useState(['Referencia', 'Nombre', 'Descripcion', 'Precio', 'Imagen']);

    return (
        <div className="listar-productos">
            <TablaListar
                lstTitlesTable={titlesTable}
                lstDataEntity={productos} nameEntity={'Productos'}
                redirectionBtnCreate={'/Admin/Productos/CrearProducto'} redirectionBtnEdit={'/Admin/Productos'}
                functionBtnDelete={onHandleClickDelete}
            />
        </div>
    )
}
