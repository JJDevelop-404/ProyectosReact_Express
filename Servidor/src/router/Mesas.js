import { Router } from "express";
const routerMesas = Router();

import { asignarMesaAUnMesero, createMesaVacia, deleteMesa, desasignarMesaAUnMesero, getMesas, getMesasByMesero } from "../controller/Mesas.js";

routerMesas.get('/getMesas', getMesas);
routerMesas.get('/getMesasByMesero/:MeseroId', getMesasByMesero);
routerMesas.post('/createMesa', createMesaVacia);
routerMesas.post('/asignarMesa', asignarMesaAUnMesero);
routerMesas.put('/liberarMesa', desasignarMesaAUnMesero);
routerMesas.delete('/deleteMesa/:MesaId', deleteMesa);

export default routerMesas;