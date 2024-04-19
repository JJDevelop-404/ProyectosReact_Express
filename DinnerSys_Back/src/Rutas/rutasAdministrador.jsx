import { ProtectedRouteAdmin } from "../PRouteContent/ProtectedRoute";
import AdminHome from "../pages/Administrador/AdminHome";
import Categoria from "../pages/Administrador/gestionCategorias/Categoria";
import ListarCategorias from "../pages/Administrador/gestionCategorias/ListarCategorias";
import ModificarCategoria from "../pages/Administrador/gestionCategorias/ModificarCategoria";
import Empleado from "../pages/Administrador/gestionEmpleados/Empleado";
import ListarEmpleados from "../pages/Administrador/gestionEmpleados/ListarEmpleados";
import ModificarEmpleado from "../pages/Administrador/gestionEmpleados/ModificarEmpleado";
import ListarMesas from "../pages/Administrador/gestionMesas/ListarMesas";
import ListarPedidos from "../pages/Administrador/gestionPedidos/ListarPedidos";
import ListarProductos from "../pages/Administrador/gestionProductos/ListarProductos";
import ModificarProducto from "../pages/Administrador/gestionProductos/ModificarProducto";
import Producto from "../pages/Administrador/gestionProductos/Producto";

export let routesAdmin = ([
    {
        path: "/",
        element: <ProtectedRouteAdmin />,
        children: [
            {
                path: "/Admin",
                element: <AdminHome />
            },
            // RUTAS EMPLEADOS
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
            // RUTAS PRODUCTOS
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
            // RUTAS CATEGORIAS
            {
                path: "/Admin/Categorias",
                element: <ListarCategorias />
            },
            {
                path: "/Admin/Categorias/NuevaCategoria",
                element: <Categoria />
            },
            {
                path: "/Admin/Categorias/EditarCategoria/:categoriaId",
                element: <ModificarCategoria />
            },
            // RUTAS MESAS
            {
                path: "/Admin/Mesas",
                element: <ListarMesas />
            },
            // RUTAS PEDIDOS
            {
                path: "/Admin/Pedidos",
                element: <ListarPedidos />
            }
        ]
    }
]);