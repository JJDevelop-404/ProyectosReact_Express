import App from "../../App";
import FormCreateEdit from "../../components/FormCreateEdit/FormCreateEdit";
import CrearUsuario from "../../pages/Admin/Usuarios/CrearUsuario";
import ModificarUsuario from "../../pages/Admin/Usuarios/ModificarUsuario";
import Login from "../../pages/globalPages/Login/Login";
import PageError from "../../pages/globalPages/PageError/PageError";

export const globalRoutes = [
    {
        path: '*',
        element: <PageError />
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