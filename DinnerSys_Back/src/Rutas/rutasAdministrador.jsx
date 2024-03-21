import { ProtectedRouteAdmin } from "../PRouteContent/ProtectedRoute";
import AdminHome from "../pages/Administrador/AdminHome";
import Empleado from "../pages/Administrador/gestionEmpleados/Empleado";
import ListarEmpleados from "../pages/Administrador/gestionEmpleados/ListarEmpleados";
import ModificarEmpleado from "../pages/Administrador/gestionEmpleados/ModificarEmpleado";
import ListarMesas from "../pages/Administrador/gestionMesas/ListarMesas";
import ListarProductos from "../pages/Administrador/gestionProductos/ListarProductos";
import ModificarProducto from "../pages/Administrador/gestionProductos/ModificarProducto";
import Producto from "../pages/Administrador/gestionProductos/Producto";

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
                element: <Empleado />
            },
            {
                path: "/Admin/Empleados/EditarEmpleado/:empleadoId",
                element: <ModificarEmpleado />
            },
            {
                path: "/Admin/Productos",
                element: <ListarProductos />
            },
            {
                path: "/Admin/Productos/NuevoProducto",
                element: <Producto />
            },
            {
                path: "/Admin/Productos/EditarProducto/:productoId",
                element: <ModificarProducto />
            },
            {
                path: "/Admin/Mesas",
                element: <ListarMesas />
            }
        ]
    }
]);