import { ProtectedRouteAdmin } from "../PRouteContent/ProtectedRoute";
import AdminHome from "../pages/Administrador/AdminHome";
import Empleados from "../pages/Administrador/gestionEmpleados/Empleados";

export let routesAdmin = ([
    {
        path: "/Admin",
        element: <ProtectedRouteAdmin />,
        children: [
            {
                path: "/Admin/Home",
                element: <AdminHome />
            },
            {
                path: "/Admin/Empleados",
                element: <Empleados />
            }
        ]
    }
]);