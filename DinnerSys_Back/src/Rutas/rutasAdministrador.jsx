import { ProtectedRouteAdmin } from "../PRouteContent/ProtectedRoute";
import AdminHome from "../pages/Administrador/AdminHome";
import Empleado from "../pages/Administrador/gestionEmpleados/Empleado";
import ListarEmpleados from "../pages/Administrador/gestionEmpleados/ListarEmpleados";

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
                element: <ListarEmpleados />
            },
            {
                path: "/Admin/Empleados/NuevoEmpleado",
                element: <Empleado/>
            },
            {
                path: "/Admin/Empleados/EditarEmpleado/:empleadoId",
                element: <Empleado/>
            }
        ]
    }
]);