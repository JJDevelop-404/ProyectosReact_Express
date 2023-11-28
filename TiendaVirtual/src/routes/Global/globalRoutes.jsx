import App from "../../App";
import Login from "../../pages/Admin/Login/Login";
import PageError from "../../pages/globalPages/PageError/PageError";

export const globalRoutes = [
    {
        path: '*',
        element: <PageError/>
    },
    {
        path: '/',
        element: <App />
    },
    {
        path: 'Nosotros',
        element: <h1>Acerca de Nosotros</h1>
    },
    {
        path: "/AdminLog/AccesToAdmin",
        element: <Login/>
    },
]