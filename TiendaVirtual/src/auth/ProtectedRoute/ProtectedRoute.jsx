//Componente para proteger las rutas
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export function ProtectedRouteMesero({ RedirectTo = '/' }) {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={RedirectTo} />
}

export function ProtectedRouteAdmin({ RedirectTo = '/' }) {
    const { isAuthenticated, Rol } = useAuth();

    return isAuthenticated && Rol.includes('administrador') ? <Outlet /> : <Navigate to={RedirectTo} />
}
