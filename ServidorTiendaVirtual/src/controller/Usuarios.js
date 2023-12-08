import { pool } from '../conexion/conexion.js';

// METODOS POST --- CREATE
// usuarios/createUsuario --> Funcion para agregar un usuario

// METODOS GET --- READ
// usuarios/getUsuarios --> Funcion para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    console.log("\n\nFuncion: getUsuarios()");
    try {
        const usuarios = await (pool.query('SELECT * FROM usuarios'));
        if(usuarios.length > 0){
            console.log(usuarios);
            res.status(200).json(usuarios);
        } else {
            console.log("No se encontraron usuarios");
            res.status(200).json({message: "No se encontraron usuarios"});
        }
    } catch (error) {
        console.log("Error en getUsuarios(): " + error.message);
        res.status(500).json({Error: "Error en el servidor: " + error.message});
    }
}

// usuarios/getUsuarioById --> Funcion para obtener un usuario por id
export const getUsuarioById = async (req, res) => { 
    console.log("\n\nFuncion: getUsuarioById()");
    try {
        const { IdUsuario } = req.params; //Forma 1 de obtener el Id desde la ruta
        //const userId = req.params.IdUsuario; //Forma 2 de obtener el Id desde la ruta
        const usuario = await pool.query("SELECT * FROM Usuarios WHERE UsuarioId = ?", [IdUsuario]);
        if(usuario.length > 0){
            console.log(usuario);
            res.status(200).json(usuario);
        } else {
            console.log("No se encontro el usuario");
            res.status(200).json({message: "No se encontro el usuario"});
        }
    } catch (error) {
        console.log("Error en getUsuarioById(): " + error.message);
        res.status(500).json({Error: "Error en el servidor: " + error.message});
    }
};