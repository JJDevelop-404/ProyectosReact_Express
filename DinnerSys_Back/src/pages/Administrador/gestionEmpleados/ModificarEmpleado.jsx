import Empleado from './Empleado.jsx';
import { modificarUsuario } from '../../../API/Usuarios.js';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ModificarEmpleado() {
    const location = useLocation();
    const navigate = useNavigate();

    const dataEmpleado = location.state;
    console.log(dataEmpleado);

    const editarEmpleado = async (empleado) => {
        return await modificarUsuario(dataEmpleado && dataEmpleado.usuarioId, empleado);
    }

    if (dataEmpleado !== null) {
        return (
            <>
                <Empleado dataEmpleado={dataEmpleado} funcionEditarEmpleado={editarEmpleado} />
            </>
        )
    } else {
        return (
            <Navigate to={'/Admin/Empleados'} />
        )
    }

}
