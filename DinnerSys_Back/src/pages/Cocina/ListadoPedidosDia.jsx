import { useState, useEffect } from 'react'
import { getPedidosCocina } from '../../API/Pedidos';
import { alertError } from '../../components/Tabla';
import '../Mesero/StylesMesero/PedidosRealizados.css';
import './ListarPedidosDia.css';
import { liberarPedido } from '../../API/Pedidos.js';
import { alertaCrearEditar } from '../../components/FormCrearEditar';

export default function ListadoPedidosDia() {

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        getPedidosCocina()
            .then((response) => {
                if (response) {
                    console.log(response);
                    setPedidos(response);
                } else {
                    alertError('No fue posible traer los pedidos', 'Error del servidor o servidor desconectado');
                }
            })
    }, []);

    const onHandleClickLiberarPedido = (pedidoId) => {
        console.log(pedidoId);
        liberarPedido(pedidoId)
            .then((response)=>{
                response ? alertaCrearEditar('Pedido Finalizado', 'succes', ()=>window.location.reload())
                    : alertError('Error al finalizar el pedido', 'servidor desconectado');
            })
    }

    return (
        <>
            <div className="container-pedidos-realizados cocina m-3">
                {pedidos && pedidos.filter(p => p.Finalizado === 0).map((pedido, index) => (
                    <div key={index} className="container-pedido">
                        <h1 className="numero-mesa"> <i> <b>Mesa N° {pedido.Mesa} </b> </i> </h1>
                        <label className="label-mesero-pedido"> <b> {"Mesero: "} </b> {pedido.Mesero} </label>
                        <label className="label-fecha-pedido align-middle"> <b>Hora:</b> {pedido.Fecha.split(',')[1]} </label>
                        <div className="container-table-pedido">
                            <table className="table-productos-pedido">
                                <thead>
                                    <tr>
                                        <th> Nombre </th>
                                        <th> Cantidad </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedido.lstProductos.map((producto, index) => (
                                        <tr key={index}>
                                            <td> {producto.Producto} </td>
                                            <td> {producto.Cantidad} </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <label className="label-total-pedido">  Total Pedido: {pedido.PrecioTotalPedido} </label>
                        <button className='btn-liberar-pedido' onClick={()=>onHandleClickLiberarPedido(pedido.PedidoId)}> Realizado </button>
                    </div>
                ))}
            </div>
        </>
    )
}
