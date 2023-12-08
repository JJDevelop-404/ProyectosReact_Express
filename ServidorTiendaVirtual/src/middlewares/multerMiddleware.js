import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: './src/public/images/productos/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },//Esto es para que cuando subamos el archivo, guarde el nombre original

})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;//Esto es para los tipos de archivos permitidos
    const mimetype = filetypes.test(file.mimetype);//Esto es para verificar que el archivo subido tenga la extension correcta
    const extname = filetypes.test(path.extname(file.originalname));//Esto es para verificar que el archivo subido tenga la extension correcta
    if (mimetype && extname) {
        return cb(null, true);
    }
    console.log("hola");
    cb("Error: El archivo debe ser una imagen valida");
}

const fileSize = (req, file, cb) => {
    if (file.size > 2000000) {
        return cb("Error: El archivo debe ser menor a 2MB");
    }
    cb(null, true);
}

export const multerMiddleware = multer({
    storage: storage,
    limits: fileSize, //Esto es para limitar el tamaño del archivo en bytes
    fileFilter: fileFilter //Esto es para limitar el tipo de archivo
}).single('image');