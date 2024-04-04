import Empleado from './Empleado.jsx';
import { modificarUsuario } from '../../../API/Usuarios.js';
import { Navigate, useLocation } from 'react-router-dom';

export default function ModificarEmpleado() {
    const location = useLocation();

    const dataEmpleado = {
        ...location.state,
        cbxTipoUsuario: location.state.TipoUsuario
    }
    delete dataEmpleado.TipoUsuario;

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
