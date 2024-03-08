import { pool } from "../conexion/conexion.js";

//METODOS GET PARA OBTENER PRODUCTOS
//Funcion para obtener todos los productos
export const getProductos = async (req, res) => {
    console.log("\n\nFuncion getProductos():");
    try {
        const Productos = await pool.query('SELECT P.ProductoId, P.Nombre, P.Descripcion, P.Precio, P.Categoria  FROM Productos P WHERE P.Inactivo = 0');
        if (Productos.length > 0) {
            console.log("Productos: ", Productos);
            res.status(200).json(Productos);
        } else {
            console.log("No hay productos");
            res.status(200).json({ Error: 'No hay ningun producto' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

//Funcion para obtener un producto por su id
export const getProductoById = async (req, res) => {
    console.log("\n\nFuncion getProductoById():");

    try {
        const { ProductoId } = req.params;
        // Verificar si el ID es un numero valido y es un numero entero positivo
        if (ProductoId > 0) {
            const [producto] = await pool.query('SELECT * FROM productos WHERE productoid = ?', [ProductoId]);
            console.log('Respuesta consulta producto: ', producto);
            if (producto) {
                console.log('Producto encontrado: ', producto.rows);
                res.status(200).json(producto);
            } else {
                res.status(404).json({ mensaje: 'No se encontro un producto con el ID ' + ProductoId + ' que has proporcionado.' });
            }
        } else {
            res.status(400).json({ mensaje: 'El ID proporcionado no es un numero entero positivo valido.' });
        }

    } catch (error) {
        console.error('Error del servidor: ', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
};

//METODO POST PARA CREAR PRODUCTO
export const createProducto = async (req, res) => {
    console.log("\n\nFuncion createProducto():");
    try {
        const { Nombre, Descripcion, Precio, Categoria } = req.body;
        // Verificar si alguno de los campos esta vacío
        if (Nombre && Descripcion && Precio && Categoria) {

            // Verificar que el Precio sea un numero positivo
            if (Precio >= 100) {
                // Verificar si la categoría es "Comida" o "Bebida"
                if (Categoria === "Comida" || Categoria === "Bebida") {
                    const isInsert = await pool.query('INSERT INTO productos (Nombre, Descripcion, Precio, Categoria) VALUES (?,?,?,?)',
                        [Nombre, Descripcion, Precio, Categoria]);
                    if(isInsert.affectedRows === 1){//Si se inserto correctamente
                        console.log("Producto creado correctamente");
                        res.status(200).json({ mensaje: 'Producto creado correctamente' });
                    }else{
                        console.log("Error al crear el producto");
                        res.status(500).json({ error: 'Error al crear el producto' });
                    }
                }else{
                    console.log("Categoría no valida");
                    res.status(400).json({ error: "Categoría no valida" });
                }
            }else{
                console.log("El Precio debe ser mayor a 100");
                res.status(400).json({ error: "El Precio debe ser mayor a 100" });
            }
        }else{
            console.log("Ausencia de datos");
            res.status(400).json({ error: "Ausencia de datos" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor ',error });
    }
};

//METODO PUT PARA ACTUALIZAR PRODUCTO
export const updateProducto = async (req, res) => {
    console.log("\n\nFuncion updateProducto():");
    try {
        const { ProductoId } = req.params;
        const { Nombre, Descripcion, Precio, Categoria } = req.body;
        // Verificar que precio sea mayor a 100
        if(Precio > 100){
            // Verificar que la categoria sea "Comida" o "Bebida"
            if(Categoria === "Comida" || Categoria === "Bebida" || !Categoria){
                //El COALESCE() es para que si el campo viene vacio, no lo actualice
                const isUpdate = await pool.query('UPDATE Productos SET Nombre = COALESCE(?, Nombre), Descripcion = COALESCE(?, Descripcion), '+
                    'Precio = COALESCE(?, Precio), Categoria = COALESCE(?, Categoria) WHERE ProductoId = ?', 
                    [Nombre, Descripcion, Precio, Categoria, ProductoId]);
                
                if(isUpdate.affectedRows === 1){//Si se actualizo correctamente
                    console.log("Producto actualizado correctamente");
                    res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
                }else{
                    console.log("El producto a actualizar no existe");
                    res.status(404).json({ error: 'El producto a actualizar no existe' });
                }
            }else{
                console.log("Categoría no valida");
                res.status(400).json({ error: "Categoría no valida" });
            }
        }else{
            console.log("El Precio debe ser mayor a 100");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}

//METODO DELETE PARA ELIMINAR PRODUCTO
export const deleteProducto = async (req, res) => {
    console.log("\n\nFuncion deleteProducto():");
    try {
        const { ProductoId } = req.params;
        // Inhabilitamos el producto con el campo Inactivo para que no se muestre en la lista de productos
        const isDelete = await pool.query('UPDATE Productos SET Inactivo = 1 WHERE ProductoId = ?', [ProductoId]);
        if (isDelete.affectedRows === 1) {
            console.log("Producto eliminado correctamente");
            res.status(200).json({ Message: 'Producto eliminado correctamente' });
        } else {
            console.log("Error, el producto no existe");
            res.status(404).json({ Error: 'Error, el producto no existe' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor ', error });
    }
}