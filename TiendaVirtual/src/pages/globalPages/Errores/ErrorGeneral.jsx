import { useNavigate } from 'react-router-dom';
import './styles/ErrorGeneral.css';

export default function ErrorGeneral({ status, tituloError, descripcionError, mostrarBoton = true, textoBoton = 'Regresar', funcionBoton }) {

    const navigate = useNavigate();

    return (
        <div className="error-general-component">
            <div className="container-error-general">
                <h1 className="display-1 fw-bold"> {status} </h1>
                <p className="fs-3 text-danger"> <b>Error:</b> {tituloError} </p>
                <p className="fs-5">
                    {descripcionError ? descripcionError : 'Lo sentimos, algo salió mal. Por favor, inténtelo de nuevo'}
                </p>
                <button onClick={funcionBoton ? funcionBoton : ()=>navigate('/')} hidden={!mostrarBoton} className="btn btn-dark"> {textoBoton} </button>
            </div>
        </div>
    )
}
