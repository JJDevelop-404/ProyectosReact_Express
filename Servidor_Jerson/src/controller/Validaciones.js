import { pool } from "../conexion/conexion.js"; 
/* Función para validar la longitud mínima de la cédula (solo números)
Esta funcion se encargara de verificar el campo 
CEDULA: El cual solo podra tener numero enteros positivos, al igual que debera
tener un minimo de 9 digitos
 */
export const validarLongitudMinimaCedula = (valor, longitudMinima) => {
    return /^\d+$/.test(valor) && valor.length >= longitudMinima;
}

// Función para verificar si la cédula ya existe en la base de datos
export const verificarCedulaExistente = async (cedula) => {
    try {
        // Realiza una consulta a la base de datos para verificar la existencia de la cédula
        const result = await pool.query('SELECT COUNT(*) AS count FROM usuarios WHERE Cedula = ?', [cedula]);
        return result[0].count > 0;
    } catch (error) {
        console.error("Error al verificar la cédula en la base de datos:", error);
        // Devuelve true en caso de error para evitar insertar duplicados accidentalmente
        return true;
    }
}

/* Función para validar la longitud mínima del nombre y apellido (solo letras)
Esta funcion se encargara de verificar el campo:
NOMBRE Y APELLIDO: El cual solo podra tener letras, al igual que debera 
tener un minimo de 4 de caracteres
*/
export const validarLongitudMinimaNombreApellido = (valor, longitudMinima) => {
    return /^[a-zA-Z]+$/.test(valor) && valor.length >= longitudMinima;
}

/*Función para verificar el tipo de usuario
Esta funcion se encargara de verificar el campo:
TipoUsuario: Este solo podra tener dos valores los cuales son, Mesero o Administrador
*/ 
export const validarTipoUsuario = (valor) => {
    return valor === "Mesero" || valor === "Administrador";
}

/*Función global para verificar los datos del usuario
Esta es la funcion global encargada de verficar cada dato.
Realiza las siguientes validaciones:
1.Verifica que la cédula tenga al menos 9 dígitos y todos sean números enteros positivos.
2.Verifica que los nombres tengan al menos 4 caracteres y solo contengan letras.
3.Verifica que los apellidos tengan al menos 4 caracteres y solo contengan letras.
4.Verifica que el tipo de usuario sea "Mesero" o "Administrador".
*/
export const validarDatosUsuario = async (datos) => {
    const { Cedula, Nombres, Apellidos, TipoUsuario } = datos;

    if (!validarLongitudMinimaCedula(Cedula, 9)) {
        return "Por favor verifique su cédula.";
    }

    // Verificar si la cédula ya existe en la base de datos
    const cedulaExistente = await verificarCedulaExistente(Cedula);
    if (cedulaExistente) {
        return "La cédula ingresada ya está registrada.";
    }

    if (!validarLongitudMinimaNombreApellido(Nombres, 4)) {
        return "Su nombre debe tener un mínimo de 4 caracteres y solo puede contener letras.";
    }

    if (!validarLongitudMinimaNombreApellido(Apellidos, 4)) {
        return "Su apellido debe tener un mínimo de 4 caracteres y solo puede contener letras.";
    }

    if (!validarTipoUsuario(TipoUsuario)) {
        return "Tipo de usuario no válido.";
    }

    return null; // Si pasa todas las validaciones, retorna null (sin error)
}
