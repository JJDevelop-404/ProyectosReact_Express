import { useFormik } from 'formik'; //Para el envio y validacion de formularios
import * as Yup from 'yup'; //Para validar campos del formulario
import './Empleado.css';


export default function Empleado({ titulo, dataEmpleado }) {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    return (
        <>
            <form className='empleado-form' onSubmit={formik.handleSubmit}>
            <h2 className='Linealh2'> {titulo ? titulo : 'Crear Usuario'} </h2>
                <div className="form-group mb-3">
                    <label htmlFor="cedula" className="form-label">Cedula</label>
                    <input name='Cedula' id="cedula" type="text" className="form-control"
                        onFocus={formik.handleBlur} /* Esto es para que el formik.touched sea true apenas clickemos el campo y de una nos salga el mensaje de error */
                        onChange={formik.handleChange} />

                    {formik.touched.Cedula && formik.errors.Cedula ? (
                        <span className='text-danger'>{formik.errors.Cedula}</span>
                    ) : null}

                </div>

                <div className="form-group mb-3">
                    <label htmlFor="nombres" className="form-label">Nombres</label>
                    <input name='Nombres' id="nombres" type="text" className="form-control"
                        onFocus={formik.handleBlur}
                        onChange={formik.handleChange} />

                    {formik.touched.Nombres && formik.errors.Nombres ? (
                        <span className='text-danger'> {formik.errors.Nombres} </span>
                    ) : null}

                </div>

                <div className="form-group mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input name='Apellidos' id="apellidos" type="text" className="form-control"
                        onFocus={formik.handleBlur}
                        onChange={formik.handleChange} />

                    {formik.touched.Apellidos && formik.errors.Apellidos ? (
                        <span className='text-danger'> {formik.errors.Apellidos} </span>
                    ) : null}

                </div>
                <div className="form-group mb-3">
                    <label htmlFor="tipo_usuario" className="form-label">Tipo Usuario</label>
                    <select name='TipoUsuario' id="tipo_usuario" className='form-select' onChange={formik.handleChange} onFocus={formik.handleBlur}>
                        <option value="Mesero"> Mesero </option>
                        <option value="Administrador"> Administrador </option>
                    </select>
                    {formik.touched.TipoUsuario && formik.errors.TipoUsuario ? (
                        <span className='text-danger'> {formik.errors.TipoUsuario} </span>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-success"> Submit </button>
            </form>
        </>
    )


    function initialValues() {
        return {
            Cedula: dataEmpleado ? dataEmpleado.Cedula : null,
            Nombres: dataEmpleado ? dataEmpleado.Nombres : null,
            Apellidos: dataEmpleado ? dataEmpleado.Apellidos : null,
            TipoUsuario: dataEmpleado ? dataEmpleado.TipoUsuario : 'Mesero'
        }
    };

    function validationSchema() {
        return {
            Cedula: Yup.string().required('Ingrese una Cedula').matches(/^[0-9]+$/, 'La cedula debe ser numerica').min(8, 'La cedula debe tener minimo 8 digitos')
                .max(12, 'La cedula debe tener maximo 12 digitos'),
            Nombres: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/, 'El nombre debe ser alfabetico')
                .min(3, 'El nombre debe tener minimo 3 caracteres').max(20, 'El nombre debe tener maximo 20 caracteres'),
            Apellidos: Yup.string().required('Ingrese un Apellido'),
            TipoUsuario: Yup.string().required('Seleccione un Tipo de Usuario')
        }
    };
}
