import { useEffect, useState } from "react"
import { getPedidosXMeseroId } from "../../API/Pedidos";
import { useAuth } from "../../auth/AuthProvider";

export default function PedidosRealizados() {
    const {UserId: MsroId} = useAuth();
    const [pedidos, setPedidos] = useState([]);
    useEffect(() => {
        getPedidosXMeseroId(MsroId)
            .then((response) => {
                if (response) {
                    console.log(response);
                    setPedidos(response);
                }
            })
    }, [])

    return (
        <>
            <div>
                {pedidos.map((pedido) => (
                    <div key={pedido.PedidoId}>
                        <h1> <b> PEDIDO N°{pedido.PedidoId} </b> </h1>
                        <p> {pedido.Fecha} </p>
                        <p> Productos: </p>

                        {pedido.lstProductos.map((producto, index) => (
                            <div key={index}>
                                <p> <b> Nombre Producto: </b> {producto.Producto} </p>
                                <p> Precio Unitario: {producto.PrecioUnitario} </p>
                                <p> Cantidad: {producto.Cantidad} </p>
                                <p> Precio Total: {producto.PrecioTotal} </p>
                            </div>
                        ))}
                        <p> <b> <i> Total Pedido: {pedido.PrecioTotalPedido} </i> </b> </p>
                    </div>
                ))}
            </div>
        </>
    )
}
