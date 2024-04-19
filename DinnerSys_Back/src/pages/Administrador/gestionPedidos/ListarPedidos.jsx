import { useEffect, useState } from "react";
import { getPedidos } from "../../../API/Pedidos";
import { alertError } from "../../../components/Tabla";
import './ListarPedidos.css';
import '../../Mesero/StylesMesero/PedidosRealizados.css';

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');

  useEffect(() => {
    getPedidos()
      .then((response) => {
        if (response) {
          setPedidos(response);
        } else {
          alertError('Error al obtener los pedidos');
        }
      });
  }, []);

  const [fechaModificada, setFechaModificada] = useState('');

  const handleFechaFiltroChange = (event) => {
    setFechaFiltro(event.target.value);
  }

  useEffect(() => {
    let nuevaFecha = fechaFiltro && fechaFiltro.split('-');
    setFechaModificada(`${nuevaFecha[2]}/${nuevaFecha[1]?.replace('0', '')}/${nuevaFecha[0]}`);
  }, [fechaFiltro]);


  const pedidosFiltrados = pedidos.filter(pe => {

    return fechaModificada ? pe.Fecha.split(',')[0]?.includes(fechaModificada)
      : pedidos;

  });
  console.log(pedidosFiltrados);

  return (
    <>
      <div className="container-filtro-fecha-pedidos">
        <input
          type="date"
          value={fechaFiltro}
          onChange={handleFechaFiltroChange}
        />
        {/* <select>
          <option value="mes">Mes</option>
          <option value="año">Año</option>
        </select> */}
      </div>
      <div className="container-pedidos-realizados m-3">
        {pedidosFiltrados && pedidosFiltrados.map((pedido, index) => (
          <div key={index} className="container-pedido">
            <h1 className="numero-pedido"> <b> PEDIDO N°{pedido.PedidoId} </b> </h1>
            <label className="label-mesero"> <b> {"Mesero: "} </b> {pedido.Mesero} </label>
            <h4 className="numero-mesa"> <i> <b>Mesa N°</b> {pedido.Mesa} </i> </h4>
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
          </div>
        ))}
      </div>
      {pedidosFiltrados.length === 0 && <h1 className="sin-pedidos-fecha"> No hay pedidos realizados en esta fecha </h1>}
    </>
  )
}
