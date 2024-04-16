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

  const handleFechaFiltroChange = (event) => {
    console.log(event.target.value);
    setFechaFiltro(event.target.value);
  };

  const filtrarPedidosPorFecha = () => {
    // Filtrar los pedidos por la fecha ingresada
    const pedidosFiltrados = pedidos.filter(pedido => pedido.Fecha.includes(fechaFiltro));
    console.log(pedidosFiltrados);
    return pedidosFiltrados;
  };

  return (
    <>
      <div className="filtro-fecha">
        <input
          type="text"
          placeholder="Ingrese la fecha (DD/MM/YYYY)"
          value={fechaFiltro}
          onChange={handleFechaFiltroChange}
        />
        <button onClick={filtrarPedidosPorFecha}>Filtrar</button>
      </div>
      <div className="container-pedidos-realizados m-3">
        {pedidos.map((pedido, index) => (
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
    </>
  )
}
