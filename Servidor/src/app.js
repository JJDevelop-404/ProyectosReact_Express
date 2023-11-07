import express, { json } from "express";
import cors from "cors";

import routerUsuario from "./router/Usuarios.js";
import routerProductos from "./router/Productos.js";
import routerMesas from "./router/Mesas.js";

const app = express();
const port = 3003;

app.use(json());
app.use(cors());    

app.use('/usuarios', routerUsuario);
app.use('/mesas', routerMesas);
app.use('/productos', routerProductos);

app.use((req,res)=>{
    res.status(404).json({Error: "No se encontro la ruta"});
    console.log("No se encontro la ruta");
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});