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
                                <th> {Th3} </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Mesas && Mesas.filter(m => m.Estado === 1).map(mesas => (
                                <tr key={mesas.MesaId}>
                                    <td> {mesas.MesaId} </td>
                                    <td> <input type='checkbox' defaultChecked={mesas.Estado === 1} disabled readOnly /> </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
