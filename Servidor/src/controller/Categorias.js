import { pool } from "../conexion/conexion.js";

// METODOS GET
// Funcion para traer todas las categorias
export const getCategorias = async (req, res) => {
    console.log("\n Funcion getCategorias():");
    try {
        const categorias = await pool.query('SELECT * FROM Categorias ORDER BY NombreCategoria ASC');
        if (categorias.length > 0) {
            console.log(categorias);
            res.status(200).json(categorias);
        } else {
            console.log("Error, no se encontraron categorias");
            res.status(404).json({ Error: "No se encontraron categorias" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Error del servidor", error });
    }
}

// METODOS CREATE
// Funcion para crear una categoria
export const createCategoria = async (req, res) => {
    console.log("\n Funcion createCategoria():");
    try {
        const { Categoria } = req.body;
        if (Categoria) {
            const isInsert = await pool.query('INSERT INTO Categorias (NombreCategoria) VALUES (?)', [Categoria]);
            if (isInsert.affectedRows === 1) {
                console.log("Categoria creada correctamente");
                res.status(201).json({ Message: "Categoria creada correctamente" });
            } else {
                console.log("Error, no se pudo crear la categoria");
                res.status(400).json({ Error: "Error, no se pudo crear la categoria" });
            }
        } else {
            console.log("Error, no hay datos necesarios");
            res.status(400).json({ Error: "Error, no hay datos necesarios" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Error del servidor", error });
    }
}

// METODOS UPDATE
// Funcion para modificar una categoria
export const updateCategoria = async (req, res) => {
    console.log("\n Funcion updateCategoria():");
    try {
        const { categoriaId } = req.params;
        const { Categoria } = req.body;
        if (categoriaId && Categoria) {
            const [isCategoria] = await pool.query('SELECT CategoriaId FROM Categorias WHERE CategoriaId = ?', [categoriaId]);
            if (isCategoria) {
                await pool.query('UPDATE Categorias SET NombreCategoria = ? WHERE CategoriaId = ?', [Categoria, categoriaId]);
                console.log("Categoria modificada correctamente");
                res.status(201).json({ Message: "Categoria modificada correctamente" });
            } else {
                console.log("Error, no se encontro la categoria");
                res.status(404).json({ Error: "Error, no se encontro la categoria" });
            }
        } else {
            console.log("Error, no se recibieron datos necesarios");
            res.status(400).json({ Error: "Error, no se recibieron datos necesarios" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Error del servidor", error });
    }
}


// METODOS DELETE
export const deleteCategoria = async (req, res) => {
    console.log("\n Funcion deleteCategoria():");
    try {
        const { categoriaId } = req.params;
        if(categoriaId){
            const isDelete = await pool.query('DELETE FROM Categorias WHERE CategoriaId = ?', [categoriaId]);
            if(isDelete.affectedRows === 1){
                console.log("Categoria eliminada correctamente");
                res.status(200).json({ Message: "Categoria eliminada correctamente" });
            }else{
                console.log("Error, no se pudo eliminar la categoria o la categoria no existe");
                res.status(400).json({ Error: "Error, no se pudo eliminar la categoria o la categoria no existe" });
            }
        }else{
            console.log("Error, no se recibieron datos necesarios");
            res.status(400).json({ Error: "Error, no se recibieron datos necesarios" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Error del servidor", error });
    }
};