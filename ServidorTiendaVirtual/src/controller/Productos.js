import fs from 'fs';
import { pool } from '../conexion/conexion.js';
import { obtenerURLArchivo, uploadImageToFirebase } from './firebase.js';

//  METODOS GET --- READ
// productos/getProductos --> Funcion para obtener todos los productos
export const getProductos = async (req, res) => {
    console.log("\n\nFuncion: getProductos()");
    console.log(req.cookies);

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
        const { ProductoId } = req.params;
        const producto = await (pool.query('SELECT * FROM productos WHERE id = ?', [ProductoId]));
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


// METODOS POST --- CREATE
// productos/createProducto --> Funcion para agregar un producto
export const createProducto = async (req, res) => {
    console.log("\n\nFuncion: createProducto()");
    try {
        const { nombre, descripcion, precio } = req.body;
        const image = req.file;

        if (!(nombre && descripcion && precio && image)) {
            return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
        }

        const buffer = fs.readFileSync(image.path);
        const uploadSuccess = await uploadImageToFirebase(image, buffer);

        if (!uploadSuccess) {
            return res.status(500).json({ error: 'Error al subir la imagen a Firebase' });
        }

        const imageURL = await obtenerURLArchivo(image.originalname);

        if (imageURL === null) {
            return res.status(500).json({ error: 'Error al obtener la URL de la imagen' });
        }

        const isInserted = await pool.query('INSERT INTO productos (Nombre, Descripcion, Precio, URLImagen) ' +
            'VALUES (?,?,?,?)', [nombre, descripcion, precio, imageURL]);

        if (isInserted.affectedRows === 1) {
            console.log("Producto agregado correctamente");
            return res.status(201).json({ message: "Producto agregado correctamente" });
        } else {
            console.log("No se pudo agregar el producto");
            return res.status(200).json({ message: "No se pudo agregar el producto" });
        }
    } catch (error) {
        console.log("Error en createProducto(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
};



// METODOS PUT --- UPDATE
// productos/updateProducto/:id --> Funcion para modificar un producto
export const updateProducto = async (req, res) => {
    console.log("\n\nFuncion: updateProducto()");
    try {
        const { ProductoId } = req.params
        console.log(req.body);
        const { nombre, descripcion, precio } = req.body;
        let image = req.file;

        const buffer = fs.readFileSync(image.path); // Se lee la imagen
        const uploadSuccess = await uploadImageToFirebase(image, buffer); // Se sube la imagen a firebase

        if (!uploadSuccess) {
            // Si no se subio la imagen a firebase se retorna un error
            return res.status(500).json({ error: 'Error al subir la imagen a Firebase' });
        }

        const imageURL = await obtenerURLArchivo(image.originalname); // Se obtiene la URL de la imagen subida a firebase
        
        if (imageURL === null) {
            return res.status(500).json({ error: 'Error al obtener la URL de la imagen' });
        }

        //El COALESCE ES PARA QUE SI NO SE ENVIA UN PARAMETRO, NO SE MODIFIQUE
        const isUpdate = await pool.query('UPDATE Productos SET Nombre = COALESCE(?, Nombre), Descripcion = COALESCE(?, Descripcion), '
            + ' Precio = COALESCE(?, Precio), URLImagen = COALESCE(?,URLImagen) WHERE ProductoId = ?', [nombre, descripcion, precio, imageURL, ProductoId]);

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