import { Router } from "express";
const routerMesas = Router();

import { createMesaVacia, deleteMesa, getMesas, getMesasByMesero, liberarMesa } from "../controller/Mesas.js";

//PETICIONES GET
routerMesas.get('/getMesas', getMesas);
routerMesas.get('/getMesasByMesero/:MeseroId', getMesasByMesero);
//PETICIONES POST
routerMesas.post('/createMesa', createMesaVacia);
//PETICIONES PUT
routerMesas.put('/updateCntdClientes');
routerMesas.put('/liberarMesa/:MesaId', liberarMesa);
//PETICIONES DELETE
routerMesas.delete('/deleteMesa/:MesaId', deleteMesa);

export default routerMesas;