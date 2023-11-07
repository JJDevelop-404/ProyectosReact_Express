import { pool } from '../conexion/conexion.js';


//METODO PARA VERFICAR LAS CREDENCIALES Y DARLE ACCESO AL USUARIO
//Funcion para obtener las credenciales de un usuario y usarlas en la funcion de loggin, es con un post porque se envia el usuario por el body
export const verificarCredenciales = async (req, res) => {
    console.log("\n\nFuncion: getCredenciales()");
    try {
        const usuario = req.body.usuario;
        const clave = req.body.clave;

        let [response] = await pool.query(' SELECT U.Nombres, U.Apellidos, D.usuarioId, D.Contrasena, U.TipoUsuario FROM DatosAcceso D \n' +
            'INNER JOIN usuarios U ON U.usuarioId = D.usuarioId WHERE D.Usuario = ?', [usuario]);
        //Lo hacemos [response] para que retorne un objeto y no un arreglo
        if (response) {
            if (response.Contrasena === clave) {
                response = {
                    id: response.usuarioId,
                    Nombre: response.Nombres,
                    Apellido: response.Apellidos,
                    rol: response.TipoUsuario.toLowerCase()
                }
                console.log(response);
                console.log("Usuario encontrado, todo correcto");
                res.status(200).json(response);
            } else {
                res.status(404).json({ Error: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ Error: 'Usuario no encontrado' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

//METODOS PARA OBTENER USUARIOS (METODOS GET)
//Funcion para obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    console.log("\n\nFuncion: getUsuarios()");
    try {
        const usuarios = await pool.query('SELECT * FROM usuarios');
        console.log(usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

//Funcion para obtener un usuario por su id
export const getUsuarioById = async (req, res) => {
    console.log("\n\nFuncion: getUsuarioById()");
    try {
        const id = req.params.id;
        const usuario = await pool.query('SELECT * FROM usuarios WHERE usuarioId = ?', [id]);
        console.log(usuario);
        res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

//Funcion para obtener todos los meseros
export const getMeseros = async (req, res) => {
    console.log("\n\nFuncion: getMeseros()");
    try {
        const Meseros = await pool.query('SELECT * FROM usuarios WHERE TipoUsuario = "Mesero"');
        console.log(Meseros);
        res.status(200).json(Meseros);
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

// METODO PARA CREAR USUARIO
//Funcion para crear un usuario
export const createUsuario = async (req, res) => {
    console.log("\n\nFuncion: createUsuario()");
    try {
        const { Cedula, Nombres, Apellidos, TipoUsuario } = req.body;
        if (Cedula && Nombres && Apellidos && TipoUsuario) {
            await pool.query('INSERT INTO usuarios (Cedula, Nombres, Apellidos, TipoUsuario) VALUES (?,?,?,?)',
                [Cedula, Nombres, Apellidos, TipoUsuario]);
            console.log("Usuario creado correctamente");
            res.status(200).json('Usuario creado');
        } else {
            console.log("Datos incompletos o ingresados erroneamente");
            res.status(400).json({ Error: 'Datos incompletos o ingresados erroneamente' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

// METODO PARA ACTUALIZAR USUARIO
export const updateUsuario = async (req, res) => {
    console.log("\n\nFuncion: updateUsuario()");
    try {
        const { UsuarioId } = req.params;
        const { Nombres, Apellidos, TipoUsuario } = req.body;
        if (Nombres || Apellidos || TipoUsuario) {
            //El COALESCE() es para que si el campo viene vacio, no lo actualice
            const result = await pool.query('UPDATE usuarios SET ' +
                'Nombres = COALESCE(?, Nombres), Apellidos = COALESCE(?, Apellidos), TipoUsuario = COALESCE(?,TipoUsuario) ' +
                'WHERE usuarioId = ?', [Nombres, Apellidos, TipoUsuario, UsuarioId]);

            console.log(result.affectedRows);//Para saber cuantas filas fueron afectadas, siempre debe decir 1
            if (result.affectedRows === 1) {
                console.log("Usuario actualizado correctamente");
                res.status(200).json({ Message: 'Usuario actualizado correctamente' });
            } else {
                console.log("No fue posible actualizar el usuario porque NO existe");
                res.status(400).json({ Error: `El usuario con el id ${UsuarioId} no existe` });
            }
        } else {
            console.log("No se recibieron datos");
            res.status(400).json({ Error: 'No se recibieron datos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

// METODO PARA ELIMINAR USUARIO
export const deleteUsuario = async (req, res) => {
    console.log("\n\nFuncion: deleteUsuario()");
    try {
        const { UsuarioId } = req.params;
        const response = await pool.query('DELETE FROM usuarios WHERE usuarioId = ? ', UsuarioId);
        if (response.affectedRows > 0) {//Tiene que ser siempre 1
            console.log("Usuario eliminado correctamente || ", response.affectedRows, "--> filas afectadas");
            res.status(200).json({ Message: 'Usuario eliminado correctamente' });
        } else {
            console.log("No fue posible eliminar el usuario");
            res.status(400).json({ Error: 'No fue posible eliminar el usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: 'Error del servidor' });
    }
}

/* 
Puedes explicarme lo que hace este archivo? dime si o no


*/