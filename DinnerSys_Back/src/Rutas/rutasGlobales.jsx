import Error404 from '../pages/Global/Error404';
import Login from '../pages/Global/Login';

export let routesGlobals = ([
    {
        path: "*",
        element: <Error404/>,
    },
    {
        path: "/",
        element: <Login />
    }
])
