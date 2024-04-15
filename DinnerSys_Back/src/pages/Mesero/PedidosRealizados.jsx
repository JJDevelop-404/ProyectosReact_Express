import { useEffect, useState } from "react"
import { getPedidosXMeseroId } from "../../API/Pedidos";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import './StylesMesero/PedidosRealizados.css';

export default function PedidosRealizados() {
    const navigate = useNavigate();
    const { UserId: MsroId } = useAuth();
    const [pedidos, setPedidos] = useState([]);

    const [isEditable, setIsEditable] = useState([]);

    useEffect(() => {
        getPedidosXMeseroId(MsroId)
            .then((response) => {
                if (response) {
                    const fechaActual = new Date();
                    let HoraActual = fechaActual.getHours() === 0 ? 12 : fechaActual.getHours() > 12 ? fechaActual.getHours() - 12 : fechaActual.getHours();
                    const minutos = fechaActual.getMinutes() < 10 ? `0${fechaActual.getMinutes()}` : fechaActual.getMinutes();
                    HoraActual = `${HoraActual}${minutos}`;
                    console.log(`Hora Actual: ${HoraActual} `);

                    // Crear un array para almacenar los valores de isEditable
                    const nuevosIsEditable = [];

                    response.forEach(pedido => {
                        const partesFecha = pedido.Fecha.split(/[\/, :]+/);
                        const horas = parseInt(partesFecha[3]);
                        const minutos = parseInt(partesFecha[4]);
                        const horaMinutosNumero = horas * 100 + minutos;

                        console.log(horaMinutosNumero, parseInt(HoraActual));

                        // Comparar el tiempo del pedido con el tiempo actual
                        if (parseInt(HoraActual) - horaMinutosNumero <= 10) {
                            nuevosIsEditable.push(true);
                            console.log('Es editable ', pedido.PedidoId);
                        } else {
                            nuevosIsEditable.push(false);
                            console.log('No es editable', pedido.PedidoId);
                        }
                    });

                    // Actualizar el estado isEditable una vez fuera del bucle forEach
                    setIsEditable(nuevosIsEditable);
                    setPedidos(response);

                }
            });
    }, []);

    console.log(isEditable);


    return (
        <>
            <div className="container-pedidos-realizados m-3">
                {pedidos.map((pedido, index) => (
                    <div key={index} className="container-pedido">
                        <h1 className="numero-pedido"> <b> PEDIDO N°{pedido.PedidoId} </b> </h1>
                        <h4 className="numero-mesa"> <b>Mesa N°</b> {pedido.Mesa} </h4>
                        <label className="label-fecha-pedido"> {pedido.Fecha} </label>
                        <table className="table-productos-pedido">
                            <thead>
                                <tr>
                                    <th> Nombre </th>
                                    <th> Precio Unitario </th>
                                    <th> Cantidad </th>
                                    <th> Precio Total </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.lstProductos.map((producto, index) => (
                                    <tr key={index}>
                                        <td> {producto.Producto} </td>
                                        <td> {producto.PrecioUnitario} </td>
                                        <td> {producto.Cantidad} </td>
                                        <td> {producto.PrecioTotal} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <label className="label-total-pedido">  Total Pedido: {pedido.PrecioTotalPedido} </label>
                        <div className="container-modificar-pedido">
                            {
                                isEditable && isEditable[index] ?
                                    <button className="btn-modificar-pedido align-middle" onClick={() => navigate(`/Mesero/${pedido.Mesa}/Pedidos`,
                                        {
                                            state: {
                                                PedidoId: pedido.PedidoId,
                                                MesaId: pedido.Mesa,
                                                lstProductos: pedido.lstProductos.map(pr => ([pr.ProductoId, pr.Cantidad, pr.PrecioTotal])),
                                                PrecioTotalPedido: pedido.PrecioTotalPedido
                                            }
                                        })}>
                                        Modificar Pedido
                                    </button>
                                    : (
                                        <label className="label-expiro-tiempo align-middle"> Expiró el tiempo para modificar </label>
                                    )}
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

