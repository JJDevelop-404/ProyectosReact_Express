import { useFormik } from 'formik'; //Para el envio y validacion de formularios
import * as Yup from 'yup'; //Para validar campos del formulario
import './Empleado.css';
import FormCrearEditar, { alertaCrearEditar } from '../../../components/FormCrearEditar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Empleado({ dataEmpleado, funcionEditarEmpleado }) {

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (empleado) => {
            if (dataEmpleado) {
                funcionEditarEmpleado(empleado).then((res) => {
                    if (res === true) {
                        alertaCrearEditar('Empleado editado correctamente', 'success', ()=>navigate('/Admin/Empleados'));
                    }else{
                        alertaCrearEditar('Error al editar empleado', 'error');
                    }
                });
            }
        }
    });

    const [lstNombresLabels] = useState(['Cedula', 'Nombres', 'Apellidos']);
    const [lstNombresSelects] = useState(['Tipo Usuario']);
    const [lstSelectOptions] = useState([['Mesero', 'Administrador']]);

    return (
        <>
            <FormCrearEditar formik={formik}
                nombreEntidad={'Empleado'} dataEntidad={dataEmpleado ? dataEmpleado : null}
                lstNombresLabels={lstNombresLabels}
                lstNombresSelects={lstNombresSelects} mtrxSelectOptions={lstSelectOptions}
                redireccionBtnRegresar={'/Admin/Empleados'} />
        </>
    )


    function initialValues() {
        return {
            Cedula: dataEmpleado ? dataEmpleado.Cedula : null,
            Nombres: dataEmpleado ? dataEmpleado.Nombres : null,
            Apellidos: dataEmpleado ? dataEmpleado.Apellidos : null,
            cbxTipoUsuario: dataEmpleado ? dataEmpleado.TipoUsuario : 'Mesero',
        }
    };

    function validationSchema() {
        return {
            Cedula: Yup.string().required('Ingrese una Cedula').matches(/^[0-9]+$/, 'La cedula debe ser numerica').min(8, 'La cedula debe tener minimo 8 digitos')
                .max(12, 'La cedula debe tener maximo 12 digitos'),
            Nombres: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/, 'El nombre debe ser alfabetico')
                .min(3, 'El nombre debe tener minimo 3 caracteres').max(20, 'El nombre debe tener maximo 20 caracteres'),
            Apellidos: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/, 'El nombre debe ser alfabetico')
                .min(3, 'El nombre debe tener minimo 3 caracteres').max(20, 'El nombre debe tener maximo 20 caracteres'),
            cbxTipoUsuario: Yup.string().required('Seleccione un Tipo de Usuario'),
        }
    };
}