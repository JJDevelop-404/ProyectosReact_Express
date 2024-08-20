import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {routerProductos}  from './router/Productos.js';
import {routerUsuarios}  from './router/Usuarios.js';
import { getConnection } from './conexion/conexion.js';

const app = express();
const port = process.env.PORT || 3000;

//Chequeamos la conexion a la base de datos
//COMENTO BASE DE DATOS PORQUE SI NO ESTA CONECTADA NO ARRANCA EL SERVIDOR
// await getConnection();

//Esto es para permitir las cookies y acceso desde cualquier sitio
app.options('*', cors({credentials: true, origin: true})); // Habilita preflight request para todas las rutas
app.use(cors({credentials: true, origin: true, }));
app.use(cookieParser())
app.use(json());

app.use('/productos', routerProductos);
app.use('/usuarios', routerUsuarios);

//Este es un middleware por si no encuentra la ruta
app.use((req, res) => {
    console.log("Ruta no encontrada");
    res.status(404).json({ Error: "Ruta no encontrada" });
});

app.listen(port, () => {
    console.log(`\n\nServidor para Tienda Virtual Zapatillas corriendo en el puerto: ${port}`);
});