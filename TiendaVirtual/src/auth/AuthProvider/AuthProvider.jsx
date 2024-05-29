import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { logout } from "../../API/APIUsuarios";

const AuthContext = createContext({ // Crea un contexto de autenticación
    isAuthenticated: false,
    setIsAuthenticated: ()=>{},
    Nombre: "",
    Rol: ""
});

export const useAuth = () => useContext(AuthContext); // Hook para obtener el contexto de autenticación


export function AuthProvider({ children }) { // Proveedor de autenticación

    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("User") ? true : false
    );

    if(!isAuthenticated){
        sessionStorage.clear();
        logout();
    }

    const userData = useMemo(() => {
        if (isAuthenticated) {
            const DataUsuario = JSON.parse(sessionStorage.getItem("User"));
            return {
                Nombre: DataUsuario.Nombre,
                Rol: DataUsuario.Rol.toLowerCase(),
            };
        }
        return {
            Nombre: "",
            Rol: ""
        };
    }, [isAuthenticated]);

    console.log("User Data: ", userData);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, ...userData }}>
            {children}
        </AuthContext.Provider>
    )
}
