import { useFormik } from 'formik'; //Para el envio y validacion de formularios
import * as Yup from 'yup'; //Para validar campos del formulario
import FormCrearEditar, { alertaCrearEditar } from '../../../components/FormCrearEditar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nuevoUsuario } from '../../../API/Usuarios';


export default function Empleado({ dataEmpleado, funcionEditarEmpleado }) {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (empleado) => {
            if (dataEmpleado) {
                //Vamos a editar un empleado
                const updateUser = {
                    ...empleado,
                    TipoUsuario: empleado.cbxTipoUsuario,
                }
                delete updateUser.cbxTipoUsuario;
                funcionEditarEmpleado(updateUser).then((res) => {
                    res === true ? alertaCrearEditar('Empleado editado correctamente', 'success', () => navigate('/Admin/Empleados'))
                        : alertaCrearEditar('Error al editar empleado', 'error');
                });

            } else {
                //Vamos a crear un nuevo empleado
                //Formateamos el objeto para que nuestro back lo reciba bien
                const newUser = {
                    ...empleado,
                    TipoUsuario: formik.values.cbxTipoUsuario,
                }
                //Eliminamos la propiedad cbxTipoUsuario ya que la reemplazamos por TipoUsuario
                delete newUser.cbxTipoUsuario;
                console.log(newUser);
                nuevoUsuario(newUser).then((res) => {
                    res === true ? alertaCrearEditar('Empleado creado correctamente', 'success', () => navigate('/Admin/Empleados'))
                        : alertaCrearEditar('Error al crear empleado', 'error');
                })
            }
        }
    });

    const [lstNombresLabels] = useState(['Cedula', 'Nombres', 'Apellidos']);
    const [lstNombresSelects] = useState(['Tipo Usuario']);
    const [lstSelectOptions] = useState([{Tipo: 'Mesero'}, {Tipo: 'Administrador'}]);

    return (
        <>
            <FormCrearEditar formik={formik}
                nombreEntidad={'Empleado'} dataEntidad={dataEmpleado ? dataEmpleado : null}
                lstNombresLabels={lstNombresLabels}
                lstNombresSelects={lstNombresSelects} lstSelectOptions={lstSelectOptions}
                redireccionBtnRegresar={'/Admin/Empleados'} />
        </>
    )


    function initialValues() {
        return {
            Cedula: dataEmpleado ? dataEmpleado.Cedula : null,
            Nombres: dataEmpleado ? dataEmpleado.Nombres : null,
            Apellidos: dataEmpleado ? dataEmpleado.Apellidos : null,
            cbxTipoUsuario: dataEmpleado ? dataEmpleado.cbxTipoUsuario : 'Mesero',
        }
    };

    function validationSchema() {
        return {
            Cedula: Yup.string().required('Ingrese una Cedula').matches(/^[0-9]+$/, 'La cedula debe ser numerica').min(8, 'La cedula debe tener minimo 8 digitos')
                .max(12, 'La cedula debe tener maximo 12 digitos'),
            Nombres: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, 'El nombre debe ser alfabetico')
                .min(3, 'El nombre debe tener minimo 3 caracteres').max(20, 'El nombre debe tener maximo 20 caracteres'),
            Apellidos: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, 'El nombre debe ser alfabetico')
                .min(3, 'El nombre debe tener minimo 3 caracteres').max(20, 'El nombre debe tener maximo 20 caracteres'),
            cbxTipoUsuario: Yup.string().required('Seleccione un Tipo de Usuario'),
        }
    };
}