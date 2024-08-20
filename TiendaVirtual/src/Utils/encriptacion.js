import CryptoJS from 'crypto-js';

//Aqui iran las funciones para encriptar y desencriptar
export function encrypt(texto){
    return CryptoJS.AES.encrypt(texto, import.meta.env.VITE_CLAVE_CRYPTO).toString();
}

export function decrypt(textoCrypt){
    const descifrado = CryptoJS.AES.decrypt(textoCrypt, import.meta.env.VITE_CLAVE_CRYPTO);
    return descifrado.toString(CryptoJS.enc.Utf8);
}