import { useLocation, useNavigate } from "react-router-dom"
import CrearUsuario from "./CrearUsuario"
import { alertaToast } from "../../../Utils/alertas";

export default function ModificarUsuario() {
    const navigate = useNavigate();
    const location = useLocation();

    let user = location.state;
    if (!user) {
        // alertaToast({titulo: 'No se recibió un usuario', icon: 'error', funcion: () => navigate('/Admin/Usuarios')});
    } else {
        user = {
            nombres: user.Nombres,
            apellidos: user.Apellidos,
            rol: user.Rol
        }
    }

    return (
        <>
            <CrearUsuario dataEntity={user} />
        </>
    )
}
