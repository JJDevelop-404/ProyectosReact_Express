import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({ // Crea un contexto de autenticación
    isAuthenticated: false,
    setIsAuthenticated: ()=>{},
    Nombre: "",
    Rol: "",
});

export const useAuth = () => useContext(AuthContext); // Hook para obtener el contexto de autenticación


export function AuthProvider({ children }) { // Proveedor de autenticación
    // console.log(document.cookie);

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("User") 
    );

    if (!isAuthenticated) {
        localStorage.clear();
    }

    const userData = useMemo(() => {
        // console.log("Calculating user data...");
        if (isAuthenticated) {
            const DataUsuario = JSON.parse(localStorage.getItem("User"));
            return {
                Nombre: DataUsuario.Nombre,
                Rol: DataUsuario.Rol
            };
        }
        return {
            Rol: "",
            Nombre: "",
        };
    }, [isAuthenticated]);
    console.log("User Data: ", userData);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, ...userData }}>
            {children}
        </AuthContext.Provider>
    )
}
