import { ProtectedRouteAdmin } from "../../auth/ProtectedRoute/ProtectedRoute";
import CrearProducto from "../../pages/Admin/Productos/CrearProducto";
import ListarProductos from "../../pages/Admin/Productos/ListarProductos";
import ModificarProducto from "../../pages/Admin/Productos/ModificarProducto";
import ListarUsuarios from "../../pages/Admin/Usuarios/ListarUsuarios";
import CrearUsuario from "../../pages/Admin/Usuarios/CrearUsuario";
import ModificarUsuario from "../../pages/Admin/Usuarios/ModificarUsuario";


export const adminRoutes = [
    {
        path: "/Admin",
        element: <ProtectedRouteAdmin RedirectTo="/" />,
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
            {
                path: "/Admin/Usuarios",
                children: [
                    {
                        path: "/Admin/Usuarios",
                        element: <ListarUsuarios />
                    },
                    {
                        path: "/Admin/Usuarios/CrearUsuario",
                        element: <CrearUsuario />
                    },
                    {
                        path: "/Admin/Usuarios/:UsuarioId",
                        element: <ModificarUsuario />
                    }
                ]
            }

        ]
    }
]