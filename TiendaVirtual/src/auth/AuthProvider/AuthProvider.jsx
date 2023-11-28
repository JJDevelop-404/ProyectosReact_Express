import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ // Crea un contexto de autenticación
    isAuthenticated: false,
    Rol: null,
});

export const useAuth = () => useContext(AuthContext); // Hook para obtener el contexto de autenticación


export function AuthProvider({ children }) { // Proveedor de autenticación
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('Admin')
    );

    console.log(isAuthenticated);

    function getRol() {
        const user = JSON.parse(localStorage.getItem('Admin'));
        return user?.Rol || null;
    }

    const [Rol, setRol] = useState(getRol()); // Estado para guardar el rol del usuario autenticado

    console.log(Rol);

    return (
        <AuthContext.Provider value={{ isAuthenticated, Rol, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
