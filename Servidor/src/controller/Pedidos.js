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
export const getPedidoXMesaId = async (req, res) => {
    console.log("\nFuncion getPedidosXMesaId():");
    try {
        const { MesaId } = req.params;
        const [PedidosXMesaId] = await pool.query('SELECT * FROM Pedidos WHERE MesaId = ?', [MesaId]);
        //Los corchetes dentro de PedidosXMesaId es para que me retorne un arreglo de objetos y no un objeto
        console.log(PedidosXMesaId);
        if (PedidosXMesaId) {
            res.status(200).json(PedidosXMesaId);
        } else {
            res.status(200).json(`No hay pedidos para esta mesa o la mesa con el id ${MesaId} no existe`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor', error);
    }
}

//METODO POST
//Funcion para agregar un pedido
export const createPedido = async (req, res) => {
    console.log("\nFuncion createPedido():");
    let { MeseroId, MesaId, lstProductos } = req.body;
    try {
        if (MeseroId && MesaId && lstProductos) {
            //Preguntamos si la mesa no está ocupada ya con anterioridad
            const [isMesaLibre] = await pool.query('SELECT M.Estado FROM Mesas M WHERE M.MesaId = ?', [MesaId]);
            if (isMesaLibre.Estado === 0) {
                //Si está libre, entonces se puede crear el pedido
                //Primero, ACTUALIZAMOS el estado de la mesa a 1 para que sea OCUPADA
                const isUpdateMesa = await pool.query('UPDATE Mesas SET Estado = 1 WHERE MesaId = ?', [MesaId]);
                if (isUpdateMesa) {
                    //Segundo, CREAMOS el pedido
                    const isCreatePedido = await pool.query('INSERT INTO Pedidos (MeseroId, MesaId) VALUES (?, ?)', [MeseroId, MesaId]);
                    if (isCreatePedido) {
                        //Tercero, OBTENEMOS el ID del Pedido creado
                        const [PedidoId] = await pool.query('SELECT PedidoId FROM Pedidos WHERE MesaId = ?', [MesaId]);
                        if (PedidoId) {
                            let cantidadInserciones = 0;
                            for (var producto of lstProductos) {
                                const isInsertDetallePedidoProducto = await pool.query('INSERT INTO DetallePedidoProducto (PedidoId, ProductoId) VALUES (?,?)', [PedidoId.PedidoId, producto.ProductoId]);
                                if (isInsertDetallePedidoProducto.affectedRows === 1) {
                                    cantidadInserciones++;
                                }
                            }
                            if (cantidadInserciones === lstProductos.length) {
                                console.log("Pedido creado correctamente");
                                res.status(201).json({ Message: 'Pedido creado correctamente' });
                            }
                        } else {
                            console.log("No fue posible obtener el ID del pedido");
                            res.status(400).json({ Error: 'No fue posible obtener el ID del pedido' });
                        }
                    } else {
                        console.log("No fue posible crear el pedido");
                        res.status(400).json({ Error: 'No se pudo crear el pedido' });
                    }
                } else {
                    console.log("No fue posible actualizar el estado de la mesa");
                    res.status(400).json({ Error: 'No fue posible actualizar el estado de la mesa' });
                }
            }else{
                console.log("La mesa ya está ocupada");
                res.status(409).json({ Error: 'La mesa ya está ocupada' });
            }
        } else {
            console.log("No se recibieron datos");
            res.status(400).json({ Error: 'No se recibieron datos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor', error);
    }
};