import express, { json } from "express";
import cors from "cors";

import routerUsuario from './router/Usuarios.js';
import routerProductos from './router/Productos.js';
import routerMesas from './router/Mesas.js';
import routerPedidos from './router/Pedidos.js';

const app = express();
const port = 3003;

app.use(json());
app.use(cors());    

app.use('/usuarios', routerUsuario);
app.use('/mesas', routerMesas);
app.use('/productos', routerProductos);
app.use('/pedidos', routerPedidos);

app.use((req,res)=>{
    res.status(404).json({Error: "No se encontro la ruta"});
    console.log("No se encontro la ruta");
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});