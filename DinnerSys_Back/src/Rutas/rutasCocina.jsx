import ListadoPedidosDia from "../pages/Cocina/ListadoPedidosDia";
import { ProtectedRouteCocina } from "../PRouteContent/ProtectedRoute";

export let routesCocina = ([
    {
        path: "/Cocina",
        element: <ProtectedRouteCocina />,
        children: [
            {
                path: "/Cocina",
                element: <ListadoPedidosDia />
            }
        ]
    }
]);