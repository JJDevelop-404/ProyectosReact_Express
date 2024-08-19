import { pool } from '../conexion/conexion.js';
import { obtenerURLArchivo, uploadImageToFirebase } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { getDocs, collection, getDoc, doc, setDoc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';

//  METODOS GET --- READ
// productos/getProductos --> Funcion para obtener todos los productos
export const getProductos = async (req, res) => {
    console.log("\n\nFuncion: getProductos()");

    try {
        await getDocs(collection(db, 'Productos'))
            .then((data) => {

                if(data.empty){
                    console.log("No hay productos registrados");
                    return res.status(200).json({message: "No hay productos registrados"});
                }

                const lstProductos = [];
                data.forEach((product) => {
                    lstProductos.push({ ProductoId: product.id, ...product.data() });
                });
                console.log(lstProductos);
                return res.status(200).json(lstProductos);
            })
            .catch((error) => {
                console.log("Error en getProductos(): " + error.message);
                return res.status(500).json({ Error: "Error en el servidor" });
            });

    } catch (error) {
        console.log("Error en getProductos(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}

// METODOS POST --- CREATE
// productos/createProducto --> Funcion para agregar un producto
export const createProducto = async (req, res) => {
    console.log("\n\nFuncion: createProducto()");
    try {
        if (req.fileValidationError) {
            console.log(`Hay un error en el archivo del producto\n error: ${req.fileValidationError}`);
            return res.status(400).json({ error: req.fileValidationError });
        }

        const { nombre, descripcion, precio } = req.body;
        const image = req.file;

        if (!(nombre && descripcion && precio && image)) {
            return res.status(400).json({ error: 'No se han proporcionado los datos suficientes' });
        }

        // console.log(image.buffer);
        //Subimos la imagen a Firebase
        // const uploadSuccess = await uploadImageToFirebase(image, image.buffer);

        // if (!uploadSuccess) {
        //     //Si no se subio la imagen a firebase se retorna un error
        //     console.log("Error al subir la imagen a Firebase");
        //     return res.status(500).json({ error: 'Error al subir la imagen a Firebase' });
        // }

        // //Ahora obtenemos la URL de la imagen subida a Firebase
        // const imageURL = await obtenerURLArchivo(image.originalname);

        // if (imageURL === null) {
        //     //Si no se obtiene la URL de la imagen se retorna un error
        //     console.log("Error al obtener la URL de la imagen");
        //     return res.status(500).json({ error: 'Error al obtener la URL de la imagen' });
        // }

        // const newProducto = {
        //     Nombre: nombre,
        //     Descripcion: descripcion,
        //     Precio: precio,
        //     URLImagen: imageURL
        // }

        // //Iniciamos la subida del documento a firebase
        // await addDoc(collection(db, 'Productos'), newProducto)
        //     .then(()=> {
        //         console.log("Producto registrado correctamente");
        //         return res.status(201).json({ message: "Producto registrado correctamente" });
        //     })
        //     .catch((error)=>{
        //         console.log("Error en createProducto(): " + error.message);
        //         return res.status(500).json({message: "Error en el servidor"});
        //     });

    } catch (error) {
        console.log("Error en createProducto(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
};



// METODOS PUT --- UPDATE
// productos/updateProducto/:id --> Funcion para modificar un producto
export const updateProducto = async (req, res) => {
    console.log("\n\nFuncion: updateProducto()");
    try {
        if (req.fileValidationError) {
            console.log("holi");
            return res.status(400).json({ error: req.fileValidationError });
        };

        const { ProductoId } = req.params
        const { nombre, descripcion, precio } = req.body;
        let imageURL = req.body.image;
        let image = req.file;


        console.log(image ? `Llega un archivo image ${image}` : `Llega la URL de la imagen ${imageURL}`);


        if (image) {
            const uploadSuccess = await uploadImageToFirebase(image, image.buffer); // Se sube la imagen a firebase

            if (!uploadSuccess) {
                // Si no se subio la imagen a firebase se retorna un error
                return res.status(500).json({ error: 'Error al subir la imagen a Firebase' });
            }

            imageURL = await obtenerURLArchivo(image.originalname); // Se obtiene la URL de la imagen subida a firebase

            if (imageURL === null) {
                return res.status(500).json({ error: 'Error al obtener la URL de la imagen subida a firebase' });
            }
        }

        //El COALESCE ES PARA QUE SI NO SE ENVIA UN PARAMETRO, NO SE MODIFIQUE
        const isUpdate = await pool.query('UPDATE Productos SET Nombre = COALESCE(?, Nombre), Descripcion = COALESCE(?, Descripcion), '
            + ' Precio = COALESCE(?, Precio), URLImagen = COALESCE(?,URLImagen) WHERE ProductoId = ?', [nombre, descripcion, precio, imageURL, ProductoId]);

        if (isUpdate.affectedRows === 1) {
            console.log("Producto modificado correctamente");
            return res.status(201).json({ message: "Producto modificado correctamente" });
        } else {
            console.log("No se pudo modificar el producto");
            return res.status(200).json({ message: "No se pudo modificar el producto" });
        }

    } catch (error) {
        console.log("Error en updateProducto(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}

// METODO DELETE --- DELETE
// productos/deleteProducto/:id --> Funcion para eliminar un producto
export const deleteProducto = async (req, res) => {
    console.log("\n\nFuncion: deleteProducto()");
    try {
        const { id } = req.params;
        const isDeleted = await pool.query('DELETE FROM Productos WHERE id = ?', [id]);
        if (isDeleted.affectedRows === 1) {
            console.log("Producto eliminado correctamente");
            return res.status(200).json({ message: "Producto eliminado correctamente" });
        } else {
            console.log("No se pudo eliminar el producto");
            return res.status(200).json({ message: "No se pudo eliminar el producto" });
        }
    } catch (error) {
        console.log("Error en deleteProducto(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}