import { useQuery } from '@tanstack/react-query'
import { getPedidosXMeseroId, getProductos, getProductosIds } from '../../API/RestauranteApi';
import { useAuth } from '../../auth/AuthProvider';

export default function PedidosRealizados() {

    const { UserId: MsroId } = useAuth();

    const { isLoading: loadPedidos, data: Pedidos } = useQuery({
        queryKey: ["Pedidos", MsroId],
        queryFn: () => getPedidosXMeseroId(MsroId)
    });

    const { isLoading: loadProductos, data: Productos } = useQuery({
        queryKey: ["Productos"],
        queryFn: () => getProductos()
    });

    if (loadPedidos || loadProductos) { return <div>Cargando Info</div>; }

    return (
        <>
            <div>
                {Pedidos.map((pedido) => (
                    <div key={pedido.id}>
                        <h3> Pedido N°{pedido.id} <br/>
                         NMesa: {pedido.MesaId} </h3>
                        {pedido.Productos.map((productoID) => {
                            // Busca el producto correspondiente en la lista de todos los productos
                            const ProductosXPedido = Productos.find((producto) => producto.id === productoID);
                            if (ProductosXPedido) {
                                return (
                                    <div key={ProductosXPedido.id}>
                                        {ProductosXPedido.Producto}
                                    </div>
                                );
                            }

                        })}
                    </div>
                ))}
            </div>
        </>
    )
}
