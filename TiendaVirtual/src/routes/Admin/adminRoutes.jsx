import ProtectedRoute from "../../auth/ProtectedRoute/ProtectedRoute";
import CrearProducto from "../../pages/Admin/Productos/CrearProducto";
import ListarProductos from "../../pages/Admin/Productos/ListarProductos";
import ModificarProducto from "../../pages/Admin/Productos/ModificarProducto";


export const adminRoutes = [
    {
        path: "/Admin",
        element: <ProtectedRoute RedirectTo="/Home" />,
        children: [
            {
                path: "/Admin/Productos",
                children: [
                    {
                        path: "/Admin/Productos",
                        element: <ListarProductos />
                    },
                    {
                        path: "/Admin/Productos/CrearProducto",
                        element: <CrearProducto />
                    },
                    {
                        path: "/Admin/Productos/:ProductoId",
                        element: <ModificarProducto />
                    }
                ]
            },
            
        ]
    }
]