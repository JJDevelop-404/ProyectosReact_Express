import { useEffect, useState } from "react"
import { MostrarProductos } from "../../../API/APIProductos";
import { alertaCargandoProceso, alertaFallaServidor } from "../../../Utils/alertas.js";
import ErrorGeneral from "../Errores/ErrorGeneral.jsx";
import Card from '../../../components/Card/Card.jsx';
import Swal from "sweetalert2";
import './styles/InicioTienda.css';

export default function InicioTienda() {
    const [lstProductos, setLstProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        alertaCargandoProceso({
            titulo: 'Cargando Productos',
            messageHtml: 'Espere un momento por favor',
            funcionAsync: () => MostrarProductos()
                .then((response) => {
                    console.log(response);
                    setCargando(false);
                    setLstProductos(response);
                    Swal.close();
                }).catch((error) => {
                    setError(error);
                    setCargando(false);
                    alertaFallaServidor({ status: error.status, mensaje: error.message });
                })
        })
    }, []);

    if (cargando) {
        return <h1> Cargando.. </h1>
    }

    if (error) {
        return <ErrorGeneral status={error.status} tituloError={error.message} textoBoton="Recargar" funcionBoton={() => window.location.reload()} />
    }

    return (
        <>
            <div className="container-inicio-tienda">
                <h1 className="text-center"> TIENDA VIRTUAL </h1>
                {lstProductos.length > 0 ?
                    <div className="container-productos-tienda">
                        <Card lstProductos={lstProductos} />
                    </div>
                    : <h1 className="text-center"> SIN PRODUCTOS PARA MOSTRAR </h1>
                }
            </div>
        </>
    )
}
