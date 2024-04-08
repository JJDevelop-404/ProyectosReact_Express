import { pool } from "../conexion/conexion.js";

//METODOS GET
//Funcion para traer todos los pedidos
export const getPedidos = async (req, res) => {
    console.log("\nFuncion getPedidos():");
    try {

        const pedido = await pool.query('SELECT ' +
            'Pe.PedidoId, ' +
            'Pe.FechaPedido, ' +
            'M.MesaId as N_Mesa, ' +
            'U.Nombres as Mesero, ' +
            'Pr.ProductoId, ' +
            'Pr.Nombre AS NombreProducto, ' +
            'Pr.Precio as PrecioUnitario, ' +
            'DPP.Cantidad, ' +
            '(Pr.Precio * DPP.Cantidad) as PrecioTotal ' +
            'FROM Pedidos Pe ' +
            'INNER JOIN detallepedidoproducto DPP ON DPP.PedidoId = Pe.PedidoId ' +
            'INNER JOIN productos Pr ON Pr.ProductoId = DPP.ProductoId ' +
            'INNER JOIN usuarios U ON U.usuarioId = Pe.MeseroId ' +
            'INNER JOIN mesas M ON M.MesaId = Pe.MesaId ');
        if (pedido) {
            castearPropiedadAFloatYRetornaSuma(pedido, 'PrecioTotal');
            let precioTotal = 0;
            let lstProductos = []; //Para agregar al objeto pedido
            let lstPedido = [];
            //Casteamos a float y obtenemos el precio total
            let pedidosId = pedido.map(pedido => pedido.PedidoId)
            let index = 0;
            // console.log(pedidosId);
            for (let i of pedido) { //Recorremos la lista de tooodos los pedidos
                // console.log(precioTotal);
                precioTotal += i.PrecioTotal;
                lstProductos.push({//Agregamos todos los atributos del producto a nuestra lista
                    Producto: i.NombreProducto,
                    PrecioUnitario: i.PrecioUnitario,
                    Cantidad: i.Cantidad,
                    PrecioTotal: i.PrecioTotal
                });

                if (pedidosId[index] !== pedidosId[index + 1]) {
                    //Preguntamos si el index en la siguiente iteración es diferente al actual
                    //En caso de ser asi, creamos el objeto pedido con sus productos y lo agregamos a la lista
                    //Y reiniciamos las variables de precioTotal del pedido en general y la lista de productos

                    const objPedido = {
                        PedidoId: i.PedidoId,
                        Fecha: new Date(i.FechaPedido).toLocaleString(), // DD/MM/YYYY, HH:MM:SS AM/PM
                        Mesa: i.N_Mesa,
                        Mesero: i.Mesero,
                        lstProductos: lstProductos,
                        PrecioTotalPedido: precioTotal
                    }
                    lstPedido.push(objPedido)
                    lstProductos = []
                    precioTotal = 0;
                }
                index++;
            }

            console.log(lstPedido);

            res.status(200).json(lstPedido);
        } else {
            console.log("Error en el servidor o servidor desconectado");
            res.statu(500).json({ Error: 'Error del servidor o servidor desconectado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error del servidor o servidor desconectado: ', error);
    }
}

//Funcion para traer los pedidos que tiene una mesa
export const getPedidoXMeseroId = async (req, res) => {
    console.log("\nFuncion getPedidosXMeseroId():");
    try {
        const { MeseroId } = req.params;
        const [isMesero] = await pool.query('SELECT usuarioId, TipoUsuario FROM Usuarios WHERE usuarioId = ?', [MeseroId]);
        if (isMesero && isMesero.TipoUsuario.toLowerCase() === "mesero") {
            //El usuario existe y es un mesero
            const pedido = await pool.query('SELECT ' +
                'Pe.PedidoId, ' +
                'Pe.FechaPedido, ' +
                'M.MesaId as N_Mesa, ' +
                'U.Nombres as Mesero, ' +
                'Pr.ProductoId, ' +
                'Pr.Nombre AS NombreProducto, ' +
                'Pr.Precio as PrecioUnitario, ' +
                'DPP.Cantidad, ' +
                '(Pr.Precio * DPP.Cantidad) as PrecioTotal ' +
                'FROM Pedidos Pe ' +
                'INNER JOIN detallepedidoproducto DPP ON DPP.PedidoId = Pe.PedidoId ' +
                'INNER JOIN productos Pr ON Pr.ProductoId = DPP.ProductoId ' +
                'INNER JOIN usuarios U ON U.usuarioId = Pe.MeseroId ' +
                'INNER JOIN mesas M ON M.MesaId = Pe.MesaId '+
                'WHERE Pe.MeseroId = ? AND DATE(Pe.FechaPedido) = CURDATE()', [MeseroId]);
            console.log(pedido);
            if (pedido) {
                castearPropiedadAFloatYRetornaSuma(pedido, 'PrecioTotal');
                let precioTotal = 0;
                let lstProductos = []; //Para agregar al objeto pedido
                let lstPedido = [];
                //Casteamos a float y obtenemos el precio total
                let pedidosId = pedido.map(pedido => pedido.PedidoId)
                let index = 0;
                // console.log(pedidosId);
                for (let i of pedido) { //Recorremos la lista de tooodos los pedidos
                    // console.log(precioTotal);
                    precioTotal += i.PrecioTotal;
                    lstProductos.push({//Agregamos todos los atributos del producto a nuestra lista
                        Producto: i.NombreProducto,
                        PrecioUnitario: i.PrecioUnitario,
                        Cantidad: i.Cantidad,
                        PrecioTotal: i.PrecioTotal
                    });

                    if (pedidosId[index] !== pedidosId[index + 1]) {
                        //Preguntamos si el index en la siguiente iteración es diferente al actual
                        //En caso de ser asi, creamos el objeto pedido con sus productos y lo agregamos a la lista
                        //Y reiniciamos las variables de precioTotal del pedido en general y la lista de productos

                        const objPedido = {
                            PedidoId: i.PedidoId,
                            Fecha: new Date(i.FechaPedido).toLocaleString(), // DD/MM/YYYY, HH:MM:SS AM/PM
                            Mesa: i.N_Mesa,
                            Mesero: i.Mesero,
                            lstProductos: lstProductos,
                            PrecioTotalPedido: precioTotal
                        }
                        lstPedido.push(objPedido)
                        lstProductos = []
                        precioTotal = 0;
                    }
                    index++;
                }
                console.log(lstPedido);
                res.status(200).json(lstPedido);
            }else{
                console.log("No hay pedidos asociados a este mesero");
                res.status(404).json({Error: 'No hay pedidos asociados a este mesero'});
            }
        } else {
            console.log("El usuario no existe o no es un mesero");
            res.status(400).json({ Error: 'El usuario no existe o no es un mesero' });
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
        const { PedidoId } = req.params;
        if (PedidoId) {
            let pedido = await pool.query('SELECT ' +
                'Pe.PedidoId, ' +
                'Pe.FechaPedido, ' +
                'M.MesaId as N_Mesa, ' +
                'U.Nombres as Mesero, ' +
                'Pr.ProductoId, ' +
                'Pr.Nombre AS NombreProducto, ' +
                'Pr.Precio as PrecioUnitario, ' +
                'DPP.Cantidad, ' +
                '(Pr.Precio * DPP.Cantidad) as PrecioTotal ' +
                'FROM Pedidos Pe ' +
                'INNER JOIN detallepedidoproducto DPP ON DPP.PedidoId = Pe.PedidoId ' +
                'INNER JOIN productos Pr ON Pr.ProductoId = DPP.ProductoId ' +
                'INNER JOIN usuarios U ON U.usuarioId = Pe.MeseroId ' +
                'INNER JOIN mesas M ON M.MesaId = Pe.MesaId ' +
                'WHERE Pe.PedidoId = ?', [PedidoId]);
            if (pedido.length > 0) {//Llego algo
                let precioTotal = castearPropiedadAFloatYRetornaSuma(pedido, 'PrecioTotal');
                //Casteamos a float y obtenemos el precio total
                let lstProductos = []; //Para agregar al objeto pedido
                for (let i of pedido) {
                    lstProductos.push({//Agregamos todos los atributos del producto a nuestra lista
                        Producto: i.NombreProducto,
                        PrecioUnitario: i.PrecioUnitario,
                        Cantidad: i.Cantidad,
                        PrecioTotal: i.PrecioTotal
                    });
                }
                const objPedido = { //Creamos nuestro objeto pedido con todos los datos
                    PedidoId: pedido[0].PedidoId,
                    Fecha: new Date().toLocaleString(pedido[0].FechaPedido),
                    Mesa: pedido[0].N_Mesa,
                    Mesero: pedido[0].Mesero,
                    lstProductos: lstProductos,
                    PrecioTotalPedido: precioTotal
                }

                console.log(objPedido);
                res.status(200).json({ objPedido });
            } else {
                console.log("No hay ningun pedido con el id ", PedidoId);
                res.status(404).json({ Error: 'No hay ningún pedido con el id ', PedidoId })
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
            //Preguntamos si el mesero existe
            const [isMesero] = await pool.query('SELECT usuarioId FROM Usuarios WHERE usuarioId = ?', [MeseroId]);
            if (isMesero) {
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
                                    const isInsertDetallePedidoProducto = await pool.query('INSERT INTO DetallePedidoProducto (PedidoId, ProductoId, Cantidad) VALUES (?,?, ?)', [PedidoId.PedidoId, producto.ProductoId, producto.Cantidad]);
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
                console.log("El mesero no existe");
                res.status(400).json({ Error: 'El mesero no existe' });
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
        const { PedidoId } = req.params;
        const { lstProductos } = req.body;
        let cantidadInserciones = 0; //
        //La idea esque esto sea una lista de objetos de productos pero que solo tenga el ID del producto y la cantidad
        if (PedidoId) {
            const [isPedido] = await pool.query('SELECT PedidoId FROM Pedidos WHERE PedidoId = ?', [PedidoId]);
            if (isPedido) {
                if (lstProductos) {
                    for (var producto of lstProductos) {
                        const isInsert = await pool.query('INSERT INTO DetallePedidoProducto (PedidoId, ProductoId, Cantidad) VALUES (?,?,?)', [PedidoId, producto.ProductoId, producto.Cantidad]);
                        if (isInsert.affectedRows === 1) {
                            console.log("Producto agregado al pedido");
                            cantidadInserciones++;
                        }
                    }
                    verificarCantidadInserciones(res, cantidadInserciones, lstProductos, "agregado");
                } else {
                    console.log("No se recibieron los productos a agregar al pedido");
                    res.status(400).json({ Error: 'No se recibieron los productos a agregar al pedido' });
                }
            } else {
                console.log("El pedido no existe");
                res.status(400).json({ Error: 'El pedido no existe' });
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
        const { PedidoId } = req.params;
        const { lstProductos } = req.body;
        //Ejemplo de estructura de la lstProductos: 
        //lstProductos = [{ProductoId: 1, Cantidad: 2}, {ProductoId: 2, Cantidad: 3}]
        if (PedidoId) {
            if (lstProductos) {
                let cantidadInserciones = 0;
                for (var producto of lstProductos) {
                    const isUpdate = await pool.query('UPDATE DetallePedidoProducto SET ProductoId = ?, Cantidad = ? WHERE PedidoId = ? AND ProductoId = ?',
                        [producto.ProductoId, producto.Cantidad, PedidoId, producto.ProductoId]);
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
        const { PedidoId } = req.params;
        if (PedidoId) {
            const isDelete = await pool.query('DELETE FROM Pedidos WHERE PedidoId = ?', [PedidoId]);
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