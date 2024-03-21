import { ProtectedRouteMesero } from '../PRouteContent/ProtectedRoute';

import Pedido from '../pages/Mesero/Pedido';
import MeseroHome from '../pages/Mesero/MeseroHome';
import PedidosRealizados from '../pages/Mesero/PedidosRealizados';
import Mesero from '../pages/Mesero/Mesero';

export let routesMesero = ([
    {
        path: "/",
        element: <ProtectedRouteMesero redirectTo='/'/>,
        children: [
            {
                path: "/Mesero/:MsroId",
                element: <Mesero/>
            },
            {
                path: "/Mesero/:MsroId/Pedidos",
                element: <Pedido />
            },
            {
                path: "/Mesero/:MsroId/Home",
                element: <MeseroHome />
            },
            {
                path: "/Mesero/:MsroId/PedidosRealizados",
                element: <PedidosRealizados />
            }
        ],
    },

])