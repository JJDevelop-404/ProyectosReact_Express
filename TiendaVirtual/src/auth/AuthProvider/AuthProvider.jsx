import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { logout } from "../../API/APIUsuarios";
import { decrypt } from "../../Utils/encriptacion";

const AuthContext = createContext({ // Crea un contexto de autenticación
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    Nombre: "",
    Rol: ""
});

export const useAuth = () => useContext(AuthContext); // Hook para obtener el contexto de autenticación


export function AuthProvider({ children }) { // Proveedor de autenticación

    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("User") ? true : false
    );
    

    const userData = useMemo(() => {
        if (!isAuthenticated) {
            sessionStorage.clear();
            logout();
        }

        if (isAuthenticated) {
            const DataUsuario = JSON.parse(sessionStorage.getItem("User"));
            return {
                Nombre: decrypt(DataUsuario.Nombre),
                Rol: decrypt(DataUsuario.Rol),
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
