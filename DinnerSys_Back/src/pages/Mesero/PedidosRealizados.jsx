import { useAuth } from '../../auth/AuthProvider';

export default function PedidosRealizados() {

    const { UserId: MsroId } = useAuth();

    return (
        <>
            <div>
                <h1> Pedidos Realizados </h1>
            </div>
        </>
    )
}
