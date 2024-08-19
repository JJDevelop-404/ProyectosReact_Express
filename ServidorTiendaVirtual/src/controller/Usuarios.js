import { pool } from '../conexion/conexion.js';
import { generateAccessToken } from '../config/generateToken.js';
import { db } from '../config/firebase.js';
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';


// METODO LOGIN
export const verificarUsuario = async (req, res) => {
    console.log("\n\nFuncion: verificarUsuario()");
    try {
        const { usuario, clave } = req.body;

        const [dataUser] = await pool.query('SELECT U.UsuarioId, U.Rol, CONCAT(U.PrimerNombre," ",U.SegundoNombre) AS Nombres FROM DatosAcceso DA '
            + 'INNER JOIN Usuarios U ON DA.UsuarioId = U.UsuarioID '
            + 'WHERE DA.Correo = ? AND DA.Contrasena = ?;', [usuario, clave]);


        if (dataUser) {
            console.log("Usuario encontrado");
            const userSet = {
                Nombre: dataUser.Nombres,
                Rol: dataUser.Rol
            }
            const token = generateAccessToken(dataUser);

            /* res.cookie("token", token, {
                httpOnly: true, //esto es para que no se pueda acceder al token desde el navegador
                secure: false, //esto es para las peticiones con https 
                sameSite: true, //esto es para que se acepte peticiones desde cualquier dominio 
                maxAge: 1000 * 60 * 60 * 24 // 1 dia // 1000ms * 60s * 60m * 24h
            }); */

            res.cookie("token", token, {
                httpOnly: true, //esto es para que no se pueda acceder al token desde el navegador
                secure: true, //esto es para las peticiones con https 
                sameSite: "none", //esto es para que se acepte peticiones desde cualquier dominio 
                maxAge: 1000 * 60 * 60 * 24 // 1 dia // 1000ms * 60s * 60m * 24h
            });

            return res.status(200).json({ message: "Usuario encontrado", userSet });
        } else {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

    } catch (error) {
        console.log("Error en verificarUsuario(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
};

// METODO LOGOUT
export const CierreSesion = async (req, res) => {
    console.log("\n\nFuncion: CierreSesion()");
    try {
        // res.cookie("token", "", {  maxAge: 0, httpOnly: true, sameSite: true, secure: false });
        res.cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "none", secure: true });
        return res.status(200).json({ message: "Sesion cerrada" });
    } catch (error) {
        console.log("Error en CierreSesion(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
};

// METODOS GET --- READ
// usuarios/getUsuarios --> Funcion para obtener todos los usuarios
export const getUsuarios = async (req, res) => {

    console.log("\n\nFuncion: getUsuarios()");
    try {
        await getDocs(collection(db, 'Usuarios'))
            .then((data) => {
                //Si no hay usuarios, retornamos un mensaje
                if(data.empty){
                    console.log("No hay usuarios registrados");
                    return res.status(200).json({message: "No hay usuarios registrados"});
                }
                //En caso contrario, seguimos para llenar nuestra lista a nuestro gusto
                const users = [];
                data.forEach((doc) => {
                    users.push({ UsuarioId: doc.id, ...doc.data() });
                });
                console.log(users);
                return res.status(200).json(users);
            })
            .catch((error) => {
                console.log("Error en getUsuarios(): " + error.message);
                return res.status(500).json({ Error: "Error en el servidor" });
            });
    } catch (error) {
        console.log("Error en getUsuarios(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}

//Crear usuario
export const crearUsuario = async (req, res) => {
    console.log("\n\nFuncion: crearUsuario()");
    try {
        const { nombres, apellidos, rol, correo, clave } = req.body;

        if (!nombres || !apellidos) {
            console.log("Datos insuficientes");
            return res.status(400).json({ message: "Datos insuficientes" });
        }

        const newUser = {
            Nombres: nombres,
            Apellidos: apellidos,
            Rol: rol ? rol : 'cliente',
            DatosAcceso: {
                Correo: correo ? correo : null,
                Clave: clave ? clave : null
            }
        }

        await addDoc(collection(db, 'Usuarios'), newUser)
            .then(() => {
                console.log("Usuario creado");
                return res.status(200).json({ message: "Usuario creado" });
            })
            .catch((error) => {
                console.log("Error en la funcion addDoc() de firebase: " + error.message);
                return res.status(500).json({ Error: "Error en el servidor" });
            });

    } catch (error) {
        console.log("Error en crearUsuario(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}

//Actualizar informacion basica usuario
export const updateInfoUsuario = async (req, res) => {
    console.log("\n\nFuncion: updateUsuario()");
    try {

        const { IdUsuario } = req.params;
        const { nombres, apellidos, rol } = req.body;
        //Imprimimos en consola el id del usuario
        console.log(req.params.IdUsuario);

        //Consultamos si los datos son suficientes
        if (!nombres && !apellidos && !rol) {
            console.log("Datos insuficientes");
            return res.status(400).json({ message: "Datos insuficientes" });
        }

        let user = await findUserById(IdUsuario);
        console.log(user);

        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user = {
            ...user,
            Nombres: nombres,
            Apellidos: apellidos,
            Rol: rol
        };

        updateDoc(doc(db, 'Usuarios', IdUsuario), user)
            .then(() => {
                console.log("Usuario actualizado");
                return res.status(200).json({ message: "Usuario actualizado" });
            })
            .catch((error) => {
                console.log("Error al actualizar usuario: " + error.message);
                return res.status(500).json({ message: "Error al actualizar usuario" });
            });
    } catch (error) {
        console.log("Error en updateInfoUsuario(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}

//Actualizar informacion de acceso usuario
export const updateInfoAccesoUsuario = async (req, res) => {
    console.log("\n\nFuncion: updateInfoAcceso()");
    //Imprimimos en consola el id del usuario
    try {
        const { IdUsuario } = req.params;
        const { correo, clave } = req.body;

        console.log(IdUsuario);

        //Consultamos si los datos son suficientes
        if (!correo && !clave) {
            console.log("Datos insuficientes");
            return res.status(400).json({ message: "Datos insuficientes" });
        }

        let userUpdate = await findUserById(IdUsuario);

        if (!userUpdate) {
            console.log(`Usuario con el id ${IdUsuario} no encontrado`);
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        console.log(userUpdate);

        userUpdate = {
            ...userUpdate,
            DatosAcceso: {
                Correo: correo,
                Clave: clave
            }
        };

        //Llamamos a la funcion update de firebase
        updateDoc(doc(db, 'Usuarios', IdUsuario), userUpdate)
            .then(() => {
                console.log("Usuario actualizado");
                return res.status(200).json({ message: "Usuario actualizado" });
            })
            .catch((error) => {
                console.log("Error al actualizar usuario: " + error.message);
                return res.status(500).json({ message: "Error al actualizar usuario" });
            });
    } catch (error) {
        console.log("Error en updateInfoAccesoUsuario(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }
}

//Eliminar usuario
export const deleteUsuario = async (req, res) => {
    console.log("\n\nFuncion: deleteUsuario()");
    try {
        const { IdUsuario } = req.params;
        console.log(IdUsuario);

        //Consultamos si el usuario existe
        const user = await findUserById(IdUsuario);

        //Si el usuario no existe, retornamos un mensaje de error
        if (!user) {
            console.log("El usuario a eliminar no existe");
            return res.status(404).json({ message: "El usuario a eliminar no existe" });
        }

        //Llamamos a la funcion delete de firebase
        await deleteDoc(doc(db, 'Usuarios', IdUsuario))
            .then(() => {
                //Operacion eliminar exitosa
                console.log("Usuario eliminado");
                return res.status(200).json({ message: "Usuario eliminado" });
            })
            .catch((error) => {
                //Error al eliminar usuario
                console.log("Error al eliminar usuario: " + error.message);
                return res.status(500).json({ message: "Error al eliminar usuario" });
            });

    } catch (error) {
        console.log("Error en deleteUsuario(): " + error.message);
        return res.status(500).json({ Error: "Error en el servidor" });
    }

}

//Funciones locales aparte
//Funcion para encontrar un usuario por id
const findUserById = async (usuarioId) => {
    const userRef = doc(db, 'Usuarios', usuarioId);
    const user = await getDoc(userRef);
    return user.exists() ? user.data() : null;
};