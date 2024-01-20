import { Router } from "express";
const routerMesas = Router();

import { asignarMesaAUnMesero, createMesaVacia, deleteMesa, desasignarMesaAUnMesero, getMesas, getMesasByMesero, liberarMesa } from "../controller/Mesas.js";

//PETICIONES GET
routerMesas.get('/getMesas', getMesas);
routerMesas.get('/getMesasByMesero/:MeseroId', getMesasByMesero);
//PETICIONES POST
routerMesas.post('/createMesa', createMesaVacia);
routerMesas.post('/asignarMesa', asignarMesaAUnMesero);
//PETICIONES PUT
routerMesas.put('/updateCntdClientes');
routerMesas.put('/desasignarMesa', desasignarMesaAUnMesero);
routerMesas.put('/liberarMesa', liberarMesa);
//PETICIONES DELETE
routerMesas.delete('/deleteMesa/:MesaId', deleteMesa);

export default routerMesas;