import { pool } from "../conexion/conexion.js";

//METODOS GET
//Funcion para traer todos los pedidos
export const getPedidos = async (req, res) => {
    console.log("\nFuncion getPedidos():");
    const { isMesero } = req.body;
    try {
        if (isMesero) {

        } else {
            const Pedidos = await pool.query('SELECT * FROM Pedidos');
            if (Pedidos) {
                console.log("Pedidos: ", Pedidos);
                res.status(200).json(Pedidos)
            } else {
                console.log("Error en el servidor o servidor desconectado");
                res.statu(500).json({ Error: 'Error del servidor:  +,servidor desconectado' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor: ', error);
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
        res.status(500).json('Error del servidor: ', error);
    }
}

//Funcion para traer el total de un pedido
export const getTotalPedido = async (req, res) => {
    console.log("\nFuncion getTotalPedido():");
    try {
        const { pedidoId } = req.params;
        if (pedidoId) {
            let pedido = await pool.query('SELECT ' +
                'Pe.pedidoId, ' +
                'Pe.FechaPedido, ' +
                'M.MesaId as N_Mesa, ' +
                'U.Nombres as Mesero, ' +
                'Pr.ProductoId, ' +
                'Pr.Nombre AS NombreProducto, ' +
                'Pr.Precio as PrecioUnitario, ' +
                'DPP.Cantidad, ' +
                '(Pr.Precio * DPP.Cantidad) as PrecioTotal ' +
                'FROM Pedidos Pe ' +
                'INNER JOIN detallepedidoproducto DPP ON DPP.PedidoId = Pe.pedidoId ' +
                'INNER JOIN productos Pr ON Pr.ProductoId = DPP.ProductoId ' +
                'INNER JOIN usuarios U ON U.usuarioId = Pe.MeseroId ' +
                'INNER JOIN mesas M ON M.MesaId = Pe.MesaId ' +
                'WHERE Pe.PedidoId = ?', [pedidoId]);
            if (pedido.length > 0) {//Llego algo
                let precioTotal = castearPropiedadAFloatYRetornaSuma(pedido, 'PrecioTotal'); 
                //Casteamos a float y obtenemos el precio total
                let lstProductos = []; //Para agregar al objeto pedido
                for(let i of pedido){
                    lstProductos.push({//Agregamos todos los atributos del producto a nuestra lista
                        Producto: i.NombreProducto,
                        PrecioUnitario: i.PrecioUnitario,
                        Cantidad: i.Cantidad,
                        PrecioTotal: i.PrecioTotal
                    });
                }
                const objPedido = { //Creamos nuestro objeto pedido con todos los datos
                    PedidoId : pedido[0].pedidoId,
                    Fecha: pedido[0].FechaPedido,
                    Mesa: pedido[0].N_Mesa,
                    Mesero: pedido[0].Mesero,
                    lstProductos: lstProductos,
                    PrecioTotalPedido: precioTotal
                }

                console.log(objPedido);
                res.status(200).json({ objPedido });
            } else {
                console.log("No hay ningun pedido con el id ", pedidoId);
                res.status(404).json({ Error: 'No hay ningún pedido con el id ', pedidoId })
            }
        } else {
            console.log("No se recibió el ID del pedido");
            res.status(400).json({ Error: 'No se recibió el ID del pedido' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ Error: 'Error del servidor: ' + error });
    }
};

//METODO POST
//Funcion para crear un pedido NUEVO
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
                            verificarCantidadInserciones(res, cantidadInserciones, lstProductos, "creado")
                        } else {
                            console.log("La mesa no tiene un pedido asociado]");
                            res.status(400).json({ Error: "La mesa no tiene un pedido asociado" });
                        }
                    } else {
                        console.log("No fue posible crear el pedido");
                        res.status(400).json({ Error: 'No se pudo crear el pedido' });
                    }
                } else {
                    console.log("No fue posible actualizar el estado de la mesa");
                    res.status(400).json({ Error: 'No fue posible actualizar el estado de la mesa' });
                }
            } else {
                console.log("La mesa ya está ocupada");
                res.status(409).json({ Error: 'La mesa ya está ocupada' });
            }
        } else {
            console.log("No se recibieron datos");
            res.status(400).json({ Error: 'No se recibieron datos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor: ', error);
    }
};

//Funcion para agregar productos a un pedido ya existente
export const agregarNuevosProductosAlPedido = async (req, res) => {
    console.log("\nFuncion agregarNuevosProductosAlPedido():");
    try {
        const { pedidoId } = req.params;
        const { lstProductos } = req.body;
        //La idea esque esto sea una lista de objetos de productos pero que solo tenga el ID del producto y la cantidad
        if (pedidoId) {
            if (lstProductos) {
                for (var producto of lstProductos) {
                    const isInsert = await pool.query('INSERT INTO DetallePedidoProducto (PedidoId, ProductoId, Cantidad) VALUES (?,?)', [pedidoId, producto.ProductoId, producto.Cantidad]);

                }
            } else {
                console.log("No se recibieron los productos a agregar al pedido");
                res.status(400).json({ Error: 'No se recibieron los productos a agregar al pedido' });
            }
        } else {
            console.log("No se recibió el ID del pedido");
            res.status(400).json({ Error: 'No se recibió el ID del pedido' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor: ', error });
    }
};

//METODO PUT
//Actualizar un pedido
export const updatePedido = async (req, res) => {
    console.log("\nFuncion updatePedido():");
    try {
        const { pedidoId } = req.params;
        const { lstProductos } = req.body;
        if (pedidoId) {
            if (lstProductos) {
                let cantidadInserciones = 0;
                for (var producto of lstProductos) {
                    const isUpdate = await pool.query('UPDATE DetallePedidoProducto SET ProductoId = ?, Cantidad = ? WHERE PedidoId = ? AND ProductoId = ?',
                        [producto.ProductoId, producto.Cantidad, pedidoId, producto.ProductoId]);
                    if (isUpdate.affectedRows === 1) { //Es decir, se insertó correctamente
                        cantidadInserciones++; //Sumamos 1 a la cantidad de inserciones
                    }
                }
                verificarCantidadInserciones(res, cantidadInserciones, lstProductos, "actualizado");
            } else {
                res.status(400).json({ Error: 'No se recibieron los datos necesarios' });
            }
        } else {
            res.status(400).json({ Error: 'No se recibió el ID del pedido' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor: ', error });
    }
};


//METODO DELETE
export const deletePedido = async (req, res) => {
    console.log("\nFuncion deletePedido():");
    try {
        const { pedidoId } = req.params;
        if (pedidoId) {
            const isDelete = await pool.query('DELETE FROM Pedidos WHERE PedidoId = ?', [pedidoId]);
            if (isDelete.affectedRows === 1) { //Siempre debe ser 1 fila afectada
                res.status(200).json({ Message: 'Pedido eliminado correctamente' });
            } else {
                res.status(400).json({ Error: 'No se pudo eliminar el pedido' });
            }
        } else {
            res.status(400).json({ Error: 'No se recibió el ID del pedido' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Error del servidor: ", error });
    }
};



//FUNCIONES APARTE
//Funcion para verificar que la cantidad de inserciones sea igual al tamaño de la lista:
const verificarCantidadInserciones = (res, cantidadInserciones, lstProductos, tipoPeticion) => {
    // console.log(cantidadInserciones, lstProductos.length);
    if (cantidadInserciones === lstProductos.length) {//Debe ser IGUAL SIEMPRE al length de la lista
        console.log(`Pedido ${tipoPeticion} correctamente`);
        res.status(201).json({ Message: `Pedido ${tipoPeticion} correctamente` });
    } else if (cantidadInserciones === 0) {
        console.log("No se insertaron productos al pedido");
        res.status(400).json({ Error: 'No se insertaron productos al pedido' });
    } else {
        console.log("No se insertaron todos los productos algunos al pedido PERO SI algunos");
        res.status(400).json({ Error: 'No se insertaron todos los productos al pedido PERO SI algunos ' });
    }
}

//Función para castear a float una propiedad
const castearPropiedadAFloatYRetornaSuma = (lstObjetos, propiedad) => {
    /*Esta función es la encargada de castear a float todos los datos 
    de tipo BigInt de una propiedad que está en una lista de objetos*/
    let suma = 0;
    for (let objeto of lstObjetos) {
        suma += parseFloat(objeto[propiedad]);
        objeto[propiedad] = parseFloat(objeto[propiedad]);
    }
    return suma;
};