import { useLocation } from "react-router-dom"
import CrearUsuario from "./CrearUsuario"

export default function ModificarUsuario() {
    const location = useLocation();
    const user = {
        nombre: 'Juan',
        apellido: 'Camilo',
        email: 'camilo@gmail.com',
        password: '1234',
        rol: 'nose',
        fileImagen: 'https://firebasestorage.googleapis.com/v0/b/tiendavirtualsneakers.appspot.com/o/productos%2FJordan1Black.png?alt=media&token=5d02636b-25a6-4355-93f9-9ee92764856c',
        filePortada: 'https://lh3.googleusercontent.com/ogw/AF2bZyicRvdDEnv9HWXNdnwJmM3JHDvpDO7HAzFVdDy4zu5CH7ZJ=s32-c-mo'
    };
    console.log("Ausilio");
    return (
        <>
            <CrearUsuario dataEntity={user} />
        </>
    )
}
