import { ProtectedRouteMesero } from '../PRouteContent/ProtectedRoute';

import TomarPedido from '../pages/Mesero/TomarPedido';
import MeseroHome from '../pages/Mesero/MeseroHome';
import PedidosRealizados from '../pages/Mesero/PedidosRealizados';
import Mesero from '../pages/Mesero/Mesero';

export let routesMesero = ([
    {
        path: "/Mesero",
        element: <ProtectedRouteMesero/>,
        children: [
            {
                path: "/Mesero/:MsroId",
                element: <Mesero/>
            },
            {
                path: "/Mesero/:MsroId/Pedidos",
                element: <TomarPedido />
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