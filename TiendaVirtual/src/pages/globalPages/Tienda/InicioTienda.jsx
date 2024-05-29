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
    }, []);

    return (
        <>
            <h1 className='text-center'>
                Tienda Virtual
            </h1>

            <Card lstProductos={lstProductos ? lstProductos : null} />

        </>
    )
}
