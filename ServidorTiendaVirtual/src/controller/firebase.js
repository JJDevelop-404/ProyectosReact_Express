import { initializeApp } from 'firebase/app';
import { getStorage, uploadBytes } from 'firebase/storage';
import admin from 'firebase-admin';
import { getDownloadURL, ref } from 'firebase/storage';
import fs, { readFileSync } from 'fs';


const serviceAccountPath = './src/serviceAccountKey.json';

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'));

/* console.log(serviceAccount); */
const firebaseApp = initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'tiendavirtualsneakers.appspot.com' //Aqui va el nombre del bucket
});

//Variable para manejar el storage de Firebase
//Contiene la referencia al bucket de Firebase
const storage = getStorage(firebaseApp);


export const obtenerURLArchivo = async (nombreImagen) => { // Funcion para obtener la URL de un archivo almacenado en Firebase
    if (!nombreImagen) {
        console.log("\nNO SE HA PROPORCIONADO EL NOMBRE DE LA IMAGEN\n");
        return null;
    }

    try {
        const storageRef = ref(storage, `productos/${nombreImagen}`);
        const url = await getDownloadURL(storageRef);
        console.log("\nURL DE LA IMAGEN:\n", url);
        return url;
    } catch (error) {
        console.log("\nERROR AL OBTENER LA URL DE LA IMAGEN:\n", error);
        return null;
    }
};

export const uploadImageToFirebase = async (file, buffer) => { // Funcion para subir a firebase nuestra imagen
    console.log("\n\nuploadImageToFirebase()");
    //Para eliminar la imagen que queda en nuestro servidor
    const pathImage = `./src/public/images/productos/${file.originalname}`;

    try {
        const imageRef = ref(storage, `productos/${file.originalname}`); //Referencia al archivo en Firebase en este caso debe haber una carpeta llamada productos
        const metadata = { contentType: file.mimetype }; //Para especificar que es un archivo de imagen
        await uploadBytes(imageRef, buffer, metadata); //Sube la imagen a Firebase
        console.log("ARCHIVO SUBIDO ");
        fs.unlinkSync(pathImage); //Elimina la imagen que se guardar en este servidor
        return true;
    } catch (error) {
        console.log("ERROR AL SUBIR EL ARCHIVO: ", error);
        return false;
    }
};

/* 
Para obtener el serviceAccountKey debe crear su cuenta de firebase y luego crear un proyecto

    Luego de crear el proyecto debe ir a la sección (configuracion del proyecto) y en la parte (cuentas de servicios)
    debe darle click en generar nueva clave privada y se descargara un archivo json que es el => serviceAccountKey

    Ahora, el nombre del bucket se encuentra en la seccion de almacenamiento de firebase, es el nombre que empieza
    con un gs:// ese lo copias y lo pegas en la variable storageBucket de la funcion initializeApp

    También, en esa misma sección de almacenamiento, debes crear una carpeta llamada productos, ya que en la funcion
    de crear y actualizar, se especifica que se guardara en la carpeta productos y si no existe, no se podra guardar
    y lanzará un error
*/