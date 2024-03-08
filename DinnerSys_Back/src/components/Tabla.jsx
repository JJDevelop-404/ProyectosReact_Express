import { Link } from 'react-router-dom';
import './Tabla.css';

export default function Tabla({ lstTitulosTabla, TituloPrincipal, TextoBotonCrear, RedireccionBotonCrear, lstData }) {

    return (
        <>
            <h2 className='titulo-tabla'> {TituloPrincipal} </h2>
            <div className="container-tabla table-responsive">
                <table className="table table-sm table-dark table-hover table-striped table-bordered">
                    <thead className='head-tbl'>
                        <tr>
                            {lstTitulosTabla && lstTitulosTabla.map((titulo) => (
                                <th key={titulo}> {titulo} </th>
                            ))}
                            <th> Acciones </th>
                        </tr>
                    </thead>
                    <tbody className='body-tbl align-middle'>
                        {lstData && lstData.map((data, index) => (
                            <tr key={index}>
                                {Object.keys(data).map((key) => (
                                    <td key={key}> {data[key]} </td>
                                ))}
                                <td>
                                    <button> Hola </button>
                                    <button> Eliminar </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link className='btn btn-success w-50' to={RedireccionBotonCrear}> {TextoBotonCrear} </Link>
        </>
    )
}
