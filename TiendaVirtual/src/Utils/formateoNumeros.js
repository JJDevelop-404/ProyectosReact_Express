// Esta función formatea una lista de números en el formato de Unidad, Decena, Centena (UDC).
export function formatearNumeroUDC(numero) {
    // Convertir el número a string y eliminar el punto decimal
    let numString = numero.toString().split('.')[0];
    // console.log(numString);
    let numero_UDC = "";

    // Recorrer el string de derecha a izquierda
    for (let j = numString.length - 1; j >= 0; j--) {
        // Añadir cada dígito al principio de numero_UDC
        numero_UDC = numString[j] + numero_UDC;

        // Si el número de dígitos añadidos es un múltiplo de 3 y j no es 0,
        // añadir un punto al principio de numero_UDC
        if ((numString.length - j) % 3 === 0 && j !== 0) {
            numero_UDC = "." + numero_UDC;
        }
    }
    return numero_UDC;
}