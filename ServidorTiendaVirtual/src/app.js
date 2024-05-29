import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

import {routerProductos}  from './router/Productos.js';
import {routerUsuarios}  from './router/Usuarios.js';
import { getConnection } from './conexion/conexion.js';

config();

const app = express();
const port = process.env.PORT || 3000;

//Chequeamos la conexion a la base de datos
await getConnection();

//Esto es para permitir las cookies y acceso desde cualquier sitio
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser())
app.use(json());

app.use('/images/productos', express.static('./src/public/images/productos'));
app.use('/productos', routerProductos);
app.use('/usuarios', routerUsuarios);

//Este es un middleware por si no encuentra la ruta
app.use((req, res) => {
    console.log("Ruta no encontrada");
    res.status(404).json({ Error: "Ruta no encontrada" });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`\n\nServidor para Tienda Virtual Zapatillas corriendo en el puerto: ${port}`);
});