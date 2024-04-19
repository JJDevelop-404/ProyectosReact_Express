import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/*Esta función es para cuando se quiera proteger una ruta con un auth que es la abrevación de authentication
y dice que si el auth es diferente de null, entonces redirija al componente hijo que está dentro de el*/
export const ProtectedRouteMesero = ({ redirectTo = '/' }) => {
    const { isAuthenticated, Rol } = useAuth();
    if(isAuthenticated && Rol === "mesero"){
        return <Outlet />
    }else{
        console.log("No es mesero");
        return <Navigate to={redirectTo} />
    }
}

export const ProtectedRouteAdmin = ({ redirectTo = '/' }) => {
    const { isAuthenticated, Rol } = useAuth();
    if (isAuthenticated && Rol === "administrador") {
        return <Outlet />
    }else{
        console.log("No es administrador");
        return <Navigate to={redirectTo} />
    }
}

export const ProtectedRouteCocina = ({redirectTo = '/'}) => { 
    const {isAuthenticated, Rol} = useAuth();
    return isAuthenticated && Rol === "cocina" ? <Outlet/>
        : <Navigate to={redirectTo} />
};