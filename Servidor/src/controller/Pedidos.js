import { pool } from "../conexion/conexion.js";

//METODOS GET
//Funcion para traer todos los pedidos
export const getPedidos = async (req, res) => {
    console.log("\nFuncion getPedidos():");
    try {
        const Pedidos = await pool.query('SELECT * FROM Pedidos');
        console.log(Pedidos);
        res.status(200).json(Pedidos)
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor', error);
    }
}

//Funcion para traer los pedidos que tiene una mesa
export const getPedidoXMesaId = async (req,res) => {
    console.log("\nFuncion getPedidosXMesaId():");
    try {
        const { MesaId } = req.params;
        const [PedidosXMesaId] = await pool.query('SELECT * FROM Pedidos WHERE MesaId = ?', [MesaId]);
        //Los corchetes dentro de PedidosXMesaId es para que me retorne un arreglo de objetos y no un objeto
        console.log(PedidosXMesaId);
        if(PedidosXMesaId){
            res.status(200).json(PedidosXMesaId);
        }else{
            res.status(200).json(`No hay pedidos para esta mesa o la mesa con el id ${MesaId} no existe`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor', error);
    }
}