import { useEffect, useState } from "react"
import { MostrarProductos } from "../../../API/APIProductos";
import Card from '../../../components/Card/Card.jsx';

export default function InicioTienda() {
    const [lstProductos, setLstProductos] = useState([]);
    useEffect(() => {
        MostrarProductos()
            .then((response) => {
                if (response) {
                    setLstProductos(response);
                }
            })
    }, [])
    return (
        <>
            <div className='container text'>
                <h1 className='text-center'>
                    Tienda Virtual
                </h1>
                <div className='row row-cols'>
                    {lstProductos.map((producto) => (
                        <Card key={producto.ProductoId} producto={producto} />
                    ))}
                </div>
            </div>
        </>
    )
}
