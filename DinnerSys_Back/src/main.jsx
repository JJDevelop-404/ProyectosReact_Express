import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import Navbar from './components/Navbar';

/* Instalar: 
react-router-dom -> para las rutas y navegación por las páginas

npm i react-router-dom 

Rutas protegidas 
https://www.youtube.com/watch?v=q4ywr3eZmk0&ab_channel=VidaMRR-Programacionweb
*/

import {routesGlobals} from './Rutas/rutasGlobales';
import { routesMesero } from './Rutas/rutasMesero';
import { routesAdmin } from './Rutas/rutasAdministrador';

let rutas = [].concat(routesGlobals, routesAdmin, routesMesero);

rutas = createBrowserRouter(rutas);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <RouterProvider router={rutas} />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)
