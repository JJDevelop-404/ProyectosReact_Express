//Componente para proteger las rutas
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export default function ProtectedRoute( {RedirectTo = '/'}) {

    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? <Outlet/> : <Navigate to={RedirectTo} />
}
