import { ProtectedRouteCocina } from "../PRouteContent/ProtectedRoute";
import ListadoPedidosDia from "../pages/Cocina/ListadoPedidosDia";

export let routesCocina = ([
    {
        path: "/",
        component: <ProtectedRouteCocina/>,
        children: [
            {
                path: "/cocina",
                element: <ListadoPedidosDia/>
            }
        ]
    }
]);