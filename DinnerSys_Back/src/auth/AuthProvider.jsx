import { createContext, useContext, useState } from "react";

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

export let TipoUsuario = "";

export function AuthProvider({ children }) {

    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("User")
    );

    if (!isAuthenticated) {
        localStorage.clear();
    }

    const ObtenerDatos = (Variable) => {
        if (isAuthenticated) {
            const DataUsuario = JSON.parse(localStorage.getItem("User"));
            if (DataUsuario) {
                switch (Variable) {
                    case "UserId": {
                        return DataUsuario.id;
                        break;
                    }case "UserRol":{
                        return DataUsuario.rol;
                        break;
                    }case "UserNombre":{
                        return DataUsuario.Nombre;
                        break;
                    }
                }
            }
        }
        return "";
    }

    const [UserId, setUserId] = useState(ObtenerDatos("UserId"));
    const [Rol, setRol] = useState(ObtenerDatos("UserRol"));
    const [Nombre, setNombre] = useState(ObtenerDatos("UserNombre"));

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, UserId, setUserId, Rol, setRol, Nombre, setNombre }}>
            {children}
        </AuthContext.Provider>
    );
}