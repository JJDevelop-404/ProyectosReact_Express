import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style/Login.css';
import { useFormik } from 'formik'; // Para el manejo de formularios
import { useState } from 'react';
import * as Yup from 'yup'; // Para validar los datos ingresados
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider/AuthProvider';

export default function Login() {

    const { isAuthenticated } = useAuth();

    const [inputActivo, setInputActivo] = useState(''); // Para el manejo del mensaje de error de los inputs
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            usuario: "",
            clave: "",
        },
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            if (formData.usuario === 'admin' && formData.clave === 'hola') {
                localStorage.setItem('Admin', JSON.stringify({ Rol: 'Admin' }));
                window.location.reload();
                navigate('/Admin/Productos');
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        }
    });

    if (!isAuthenticated) {
        return (
            <div className="d-flex justify-content-center align-items-center"> {/* Esto es para centrar el contenido  */}
                <div className='col-md-3'> {/* Esto es para el tamño de los input  */}
                    <h1 className='login-title'>Iniciar Sesión</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <input type="text" name="usuario" className="form-control" required defaultValue={'@admin.com'} autoComplete='off'
                                onFocus={() => setInputActivo('usuario')}
                                onBlur={() => setInputActivo('')}
                                onChange={formik.handleChange}
                            />
                            {inputActivo === 'usuario' && <span className='error-msj'> {formik.errors.usuario} </span>}
                            <label className='form-label'> Usuario {formik.errors.usuario ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
                        </div>
                        <br />
                        <div className='form-group'>
                            <input type="password" name="clave" className="form-control" required
                                onFocus={() => setInputActivo('clave')}
                                onBlur={() => setInputActivo('')}
                                onChange={formik.handleChange}
                            />
                            <label className='form-label'> Contraseña {formik.errors.clave ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
                            {inputActivo === 'clave' && <span className='error-msj'> {formik.errors.clave} </span>}
                        </div>
                        <br />
                        <button type='submit' className='btn btn-success'> Iniciar Sesión </button>
                    </form>
                </div>
            </div>

        );
    } else {
        return <Navigate to='/Admin/Productos' />
        // Redirigir a la página de administrador
    }

    function validationSchema() {
        return {
            usuario: Yup.string().email("Ingrese un correo válido").required("El correo es obligatorio"),
            clave: Yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener mínimo 6 caracteres")
        };
    };

}
