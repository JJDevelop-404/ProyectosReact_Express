import { pool } from '../conexion/conexion.js';

// METODOS POST --- CREATE
// productos/createProducto --> Funcion para agregar un producto
export const createProducto = async (req, res) => {
    console.log("\n\nFuncion: createProducto()");

    try {
        const { nombre, descripcion, precio } = req.body;
        const image = 'http://localhost:3000/images/productos/'.concat(req.file.originalname);
        const isInserted = await pool.query('INSERT INTO productos (Nombre, Descripcion, Precio, URLImagen) ' +
            'VALUES (?,?,?,?)', [nombre, descripcion, precio, image]);
        if (isInserted.affectedRows === 1) { // Si se inserto un registro
            console.log("Producto agregado correctamente");
            res.status(200).json({ message: "Producto agregado correctamente" });
        } else { // No se agrego el producto
            console.log("No se pudo agregar el producto");
            res.status(200).json({ message: "No se pudo agregar el producto" });
        }
    } catch (error) {
        console.log("Error en createProducto(): " + error.message);
        res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
}


//  METODOS GET --- READ
// productos/getProductos --> Funcion para obtener todos los productos
export const getProductos = async (req, res) => {
    console.log("\n\nFuncion: getProductos()");
    try {
        let lstProductos = await (pool.query('SELECT * FROM productos'));
        console.log(lstProductos);
        if (lstProductos.length > 0) {
            res.status(200).json(lstProductos)
        } else {
            console.log("No se encontraron productos");
            res.status(200).json({ message: "No se encontraron productos" });
        }
    } catch (error) {
        console.log("Error en getProductos(): " + error.message);
        res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
}
// /productos/getProductoById/:id --> Funcion para obtener un producto por su id
export const getProductoById = async (req, res) => {
    console.log("\n\nFuncion: getProductoById()");
    try {
        const { id } = req.params;
        const producto = await (pool.query('SELECT * FROM productos WHERE id = ?', [id]));
        console.log(producto);
        if (producto.length > 0) {
            res.status(200).json(producto)
        } else {
            console.log("No se encontro el producto");
            res.status(200).json({ message: "No se encontro el producto" });
        }
    } catch (error) {
        console.log("Error en getProductoById(): " + error.message);
        res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
}



// METODOS PUT --- UPDATE
// productos/updateProducto/:id --> Funcion para modificar un producto
export const updateProducto = async (req, res) => {
    console.log("\n\nFuncion: updateProducto()");
    try {
        const { id } = req.params
        console.log(req.body);
        const { nombre, descripcion, precio } = req.body;
        let image = req.file;
        if(image === undefined){
            console.log("No se envio archivo tipo imagen, solo se envio la ruta de la imagen");
            image = null;
        }else{
            image = 'http://localhost:3000/images/productos/'.concat(req.file.originalname);
        }
        //El COALESCE ES PARA QUE SI NO SE ENVIA UN PARAMETRO, NO SE MODIFIQUE
        const isUpdate = await pool.query('UPDATE Productos SET Nombre = COALESCE(?, Nombre), Descripcion = COALESCE(?, Descripcion), '
            + ' Precio = COALESCE(?, Precio), URLImagen = COALESCE(?,URLImagen) WHERE ProductoId = ?', [nombre, descripcion, precio, image, id]);

        if (isUpdate.affectedRows === 1) {
            console.log("Producto modificado correctamente");
            res.status(201).json({ message: "Producto modificado correctamente" });
        } else {
            console.log("No se pudo modificar el producto");
            res.status(200).json({ message: "No se pudo modificar el producto" });
        }

    } catch (error) {
        console.log("Error en updateProducto(): " + error.message);
        res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
}

// METODO DELETE --- DELETE
// productos/deleteProducto/:id --> Funcion para eliminar un producto
export const deleteProducto = async (req, res) => {
    console.log("\n\nFuncion: deleteProducto()");
    try {
        const { id } = req.params;
        const isDeleted = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        if (isDeleted.affectedRows === 1) {
            console.log("Producto eliminado correctamente");
            res.status(200).json({ message: "Producto eliminado correctamente" });
        } else {
            console.log("No se pudo eliminar el producto");
            res.status(200).json({ message: "No se pudo eliminar el producto" });
        }
    } catch (error) {
        console.log("Error en deleteProducto(): " + error.message);
        res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
}