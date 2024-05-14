import { verifyToken } from "../helpers/generateToken.js";
//Middleware para el manejo de autenticación de usuario y permisos

export const userAuth = async (req, res, next) => {
    console.log("\n\nFuncion: authorization()");

    const token = req.headers['authorization']; //Obtenemos el token

    try {
        if (token) {

            const isAuth = await verifyToken(token);
            if (isAuth) {
                console.log("Usuario autorizado");
                req.user = isAuth;
                console.log(isAuth);
                next();
            }else{
                console.log("Usuario no autorizado");
                res.status(401).json({ message: "Usuario no autorizado" });
            }
        } else {
            console.log("No se recibio el token");
            res.status(401).json({ message: "No se recibio el token" });
        }
    } catch (error) {
        console.log("Error en authorization(): " + error.message);
        res.status(500).json({ Error: "Error en el servidor: " + error.message });
    }
};

export const userAuthRole = (rolesPermitidos) => {
    return (req, res, next) => {
        console.log("\n\nFuncion: authorizationRole()");
        console.log(req.user.Rol);
        if(rolesPermitidos.includes(req.user.Rol.toLowerCase())){
            console.log("Usuario con permisos");
            next();
        }else{
            console.log("Usuario sin permisos");
            res.status(401).json({message: "Usuario sin permisos"});
        }
    }
};