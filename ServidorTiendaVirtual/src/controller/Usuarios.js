import { pool } from '../conexion/conexion.js';
import { generateAccessToken } from '../helpers/generateToken.js';


// METODO LOGIN
export const verificarUsuario = async (req, res) => { 
    console.log("\n\nFuncion: verificarUsuario()");
    try {
        const {usuario, clave} = req.body;

        const [dataUser] = await pool.query('SELECT DA.Correo, DA.Contrasena, U.Rol FROM DatosAcceso DA '
            +'INNER JOIN Usuarios U ON DA.UsuarioId = U.UsuarioID '
            +'WHERE DA.Correo = ? AND DA.Contrasena = ?;', [usuario, clave]);

        if(dataUser){
            console.log("Usuario encontrado");
            const token = generateAccessToken(dataUser);
            res.cookie("token", token, {
                httpOnly: true, 
                secure: true, //esto es para las peticiones con https 
                sameSite: "lax", //esto es para que se acepte peticiones desde cualquier dominios 
                maxAge: 1000 * 60 * 60 * 24 // 1 dia // 1000ms * 60s * 60m * 24h
            });
            res.status(200).json({message: "Usuario encontrado", token: token});
        } else {
            console.log("Usuario no encontrado");
            res.status(404).json({message: "Usuario no encontrado"});
        }

    }catch (error) {
        console.log("Error en verificarUsuario(): " + error.message);
        res.status(500).json({Error: "Error en el servidor: " + error.message});
    }
};

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