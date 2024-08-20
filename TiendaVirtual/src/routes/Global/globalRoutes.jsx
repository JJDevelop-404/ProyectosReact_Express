import App from "../../App";
import NotFound from "../../pages/globalPages/Errores/NotFound";
import Login from "../../pages/globalPages/Login/Login";


export const globalRoutes = [
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/',
        element: <App />
    },
    {
        path: '/Nosotros',
        element: <h1>Acerca de Nosotros</h1>
    },
    {
        path: "/InicioSesion",
        element: <Login />
    },
]