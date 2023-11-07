import { Link } from 'react-router-dom';
import './Tabla.css';

export default function Tabla({ Titulo, Th1, Th2, Th3, TextoBoton, Mesas, NMesa }) {

    return (
        <>
            <div>
                <div className="tabla-container">
                    <table className="tabla-form">
                        <thead>
                            <tr>
                                <th className="ttlo-form" colSpan="3"> {Titulo} </th>
                            </tr>
                            <tr className="espacio-row">
                                <td>&nbsp;</td>
                            </tr>
                            <tr className="dps-ttlo">
                                <th> {Th1} </th>
                                <th> {Th2} </th>
                                <th> {Th3} </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* El Mesas.filter((mesa)=>mesa.MeseroId === IdMesero) se hace para que
                        traiga solo las mesas que tiene el mesero, haciendo una relacion entre estos dos datos, Mesa y Mesero*/}
                            {Mesas.filter(m => m.CantidadClientes > 0).map(mesas => (
                                <tr key={mesas.MesaId}>
                                    <td> {mesas.MesaId} </td>
                                    <td> {mesas.CantidadClientes} </td>
                                    <td> <input type='checkbox' defaultChecked={mesas.CantidadClientes > 0} disabled readOnly /> </td>
                                </tr>
                            ))}
                            {/* {!isMesaSelect &&
                                <tr className='trMesasNoOcupadas'>
                                    <td> {NMesa} </td>
                                    <td> <input type='text' autoFocus className='txtTable' disabled={isMesaSelect} maxLength={2} /> </td>
                                    <td> <input type='checkbox' defaultChecked={isOcupada} disabled /> </td>
                                </tr>
                            } */}
                        </tbody>
                    </table>
                </div>
                {/* <div className='tabla-container-btn'>
                    <Link to="/Pedido">
                        <button type='button' className="btnFormularios"> {TextoBoton + ` En La Mesa ${NMesa}`} </button>
                    </Link>
                </div> */}
            </div>
        </>
    )
}
