import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {routerProductos}  from './router/Productos.js';
import {routerUsuarios}  from './router/Usuarios.js';

const app = express();
const port = 3000;

app.use(cors({credentials: true, origin: true}));
app.use(cookieParser())
app.use(json());

app.use('/images/productos', express.static('./src/public/images/productos'));
app.use('/productos', routerProductos);
app.use('/usuarios', routerUsuarios);

app.use((req, res) => {
    console.log("Ruta no encontrada");
    res.status(404).json({ Error: "Ruta no encontrada" });
});

app.listen(port, () => {
    console.log(`Servidor para Tienda Virtual Zapatillas corriendo en el puerto: ${port}`);
});