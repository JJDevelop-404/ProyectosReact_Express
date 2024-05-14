import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Importacion de bootstrap:
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importacion de iconos propios
import '../public/Icons/IconosLogoZapatillas/styles/style.css';
// Importacion de font-awesome
import '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core';
import '@fortawesome/free-brands-svg-icons';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-solid-svg-icons';
import './index.css';


import Navbar from './components/Navbar/Navbar.jsx';
import { adminRoutes } from './routes/Admin/adminRoutes.jsx';
import { globalRoutes } from './routes/Global/globalRoutes.jsx';
import { AuthProvider } from './auth/AuthProvider/AuthProvider.jsx';

//Hacemos esto para que el Navbar SIEMPRE aparezca en pantalla
let routes = [{ path: '/', element: <Navbar />, children: [].concat(adminRoutes, globalRoutes) }];

routes = createBrowserRouter(routes); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={routes} />
  </AuthProvider>
)
