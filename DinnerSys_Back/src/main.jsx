import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; //importamos libreria css de boostrap
import * as boostrap from 'bootstrap'; //importamos libreria js de boostrap
import './index.css';

/* Instalar: 
react-router-dom -> para las rutas y navegación por las páginas

npm i react-router-dom 

Rutas protegidas 
https://www.youtube.com/watch?v=q4ywr3eZmk0&ab_channel=VidaMRR-Programacionweb
*/

import { routesGlobals } from './Rutas/rutasGlobales';
import { routesMesero } from './Rutas/rutasMesero';
import { routesAdmin } from './Rutas/rutasAdministrador';
import { routesCocina } from './Rutas/rutasCocina';

let rutas = [{ path: '/', element: <Navbar />, children: [].concat(routesGlobals, routesAdmin, routesMesero, routesCocina) }];
// let rutas = [].concat(routesGlobals, routesAdmin, routesMesero);

rutas = createBrowserRouter(rutas);

ReactDOM.createRoot(document.getElementById('root')).render(
  /* Decidi no usar el componente de React.StrictMode ya que me 
   renderizaba 2 veces los componentes, haciendo asi, que se hicieran dos peticiones al servidor*/
  <>
    <AuthProvider>
      <RouterProvider router={rutas} />
    </AuthProvider>
  </>
)
