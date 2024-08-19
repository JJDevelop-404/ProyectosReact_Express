import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

// Esto es para limitar el tipo de archivo, en este caso solo se aceptan imagenes jpeg, jpg y png
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Esto es para los tipos de archivos permitidos
    const mimetype = filetypes.test(file.mimetype); // Esto es para verificar que el archivo subido tenga la extensión correcta
    const extname = filetypes.test(path.extname(file.originalname)); // Esto es para verificar que el archivo subido tenga la extensión correcta
    if (mimetype && extname) {
        return cb(null, true);
    }
    console.log("\nERROR, EL ARCHIVO NO ES UN FORMATO DE IMAGEN\n");
    req.fileValidationError = "El archivo no es un formato de imagen jpeg, jpg o png"; //Enviamos mensaje de error si el archivo no es un formato de imagen
    return cb(null, false);
};

// Esto es para limitar el tamaño del archivo en bytes
const fileSize = (req, file, cb) => {
    if (file.size > 2000000) {
        console.log("\nEL ARCHIVO SUPERA 2MB, NO SE GUARDARÁ\n");
        req.fileValidationError = "El archivo debe ser menor a 2MB"; //Enviamos mensaje de error si el archivo supera 2MB
        return cb("Error: El archivo debe ser menor a 2MB");
    }
    cb(null, true);
};

export const multerMiddleware = multer({
    storage: storage,
    limits: fileSize, // Esto es para limitar el tamaño del archivo en bytes
    fileFilter: fileFilter, // Esto es para limitar el tipo de archivo
}).single('image');
