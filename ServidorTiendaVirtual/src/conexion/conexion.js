//PRIMERO INSTALAMOS EN NUESTRO CASO MARIADB    
// npm install mariadb

import mariadb from 'mariadb';
import { exec } from 'child_process';
import fs from 'fs';
import { error } from 'console';

export const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ShoesShop'
});

let tryConections = 1;

export const getConnection = async () => {
    console.log("\nIntentando establecer conexión a la base de datos....\n");
    try {
        const connection = await pool.getConnection();
        console.log("Conexión a la base de datos exitosa");
        return connection;
    } catch (error) {
        console.log("Base de datos no encendida...\n Intento de conexion #" + tryConections);
        tryConections++;
        if (tryConections <= 3) {
            await startsDatabase();
            return getConnection();
        } else {
            console.log("\n\nPOR FAVOR, ENCIENDA LA BASE DE DATOS DE MANERA MANUAL\n\n");
            throw new Error("Maximo numero de intentos de reconexión alcanzado");
        }
    }
}

async function startsDatabase() {
    const pathToFileStartsDB = 'C:/Users/Usuario/Desktop/encenderBD.vbs';

    try {
        
        await fs.promises.access(pathToFileStartsDB, fs.constants.F_OK);
        await execPromise(pathToFileStartsDB);

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`El archivo encargado de encender la base de datos no se encuentra: ${pathToFileStartsDB}\n por favor revise que el archivo exista en la ruta proporcionada y vuelva a intentar.\n`);
            throw new Error(`Archivo en la ruta ${pathToFileStartsDB} no encontrado`);
        } else {
            console.log(`Error al intentar encender la base de datos: ${error.message}`);
        }
    }
}

function execPromise(filePath) {

    return new Promise((resolve, reject) => {

        exec(filePath, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error al conectarse a la base de datos o en el archivo:\n  ${error.message}`);
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}