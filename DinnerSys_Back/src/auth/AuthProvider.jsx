import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    UserId: "",
    setUserId: () => { },
    Nombre: "",
    setNombre: () => { },
    Rol: "",
    setRol: () => { }
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

    // console.log("Hola desde auth provider");

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("User")
    );

    if (!isAuthenticated) {
        localStorage.clear();
    }

    /* Usamos useMemo para asi poder calcular el valor de userData solo cuando cambie
     la variable isAuthenticated */
    const userData = useMemo(() => {
        // console.log("Calculating user data...");
        if (isAuthenticated) {
            const DataUsuario = JSON.parse(localStorage.getItem("User"));
            return {
                UserId: DataUsuario.id,
                Rol: DataUsuario.rol,
                Nombre: DataUsuario.Nombre
            };
        }
        return {
            UserId: "",
            Rol: "",
            Nombre: ""
        };
    }, [isAuthenticated]);

    // console.log("userData", userData);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, ...userData }}>
            {children}
        </AuthContext.Provider>
    );
}