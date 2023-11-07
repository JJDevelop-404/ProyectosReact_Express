import { pool } from "../conexion/conexion";

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