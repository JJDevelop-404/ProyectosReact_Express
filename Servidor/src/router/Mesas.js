import { Router } from "express";
const routerMesas = Router();

import { createMesa, deleteMesa, getMesas, liberarMesa } from "../controller/Mesas.js";

//PETICIONES GET
routerMesas.get('/getMesas', getMesas);//Obtener todas las mesas
//PETICIONES POST
routerMesas.post('/createMesa', createMesa); //Para crear una mesa
//PETICIONES PUT
routerMesas.put('/liberarMesa/:MesaId', liberarMesa); //Para cambiar el estado de mesa a 0, es decir, libre
//PETICIONES DELETE
routerMesas.delete('/deleteMesa/:MesaId', deleteMesa); //Para eliminar una mesa

export default routerMesas;