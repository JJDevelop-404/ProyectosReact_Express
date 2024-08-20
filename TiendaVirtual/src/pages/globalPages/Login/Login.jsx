import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik'; // Para el manejo de formularios
import { useState } from 'react';
import * as Yup from 'yup'; // Para validar los datos ingresados
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider/AuthProvider';
import { login } from '../../../API/APIUsuarios';
import { alertaFallaServidor, alertaToast, alertaToastFuncionAsync } from '../../../Utils/alertas';
import Swal from 'sweetalert2';
import './styles/Login.css';

export default function Login() {

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const [inputActivo, setInputActivo] = useState(''); // Para el manejo del mensaje de error de los inputs

    const formik = useFormik({
        initialValues: {
            usuario: "",
            clave: "",
        },
        validationSchema: Yup.object(validationSchema()),

        onSubmit: (formData) => {
            const usuario = {
                usuario: formData.usuario,
                clave: formData.clave
            }

            alertaToastFuncionAsync({
                titulo: 'Verificando...',
                funcionAsync: () => login(usuario)
                    .then((response) => {
                        console.log(response);
                        sessionStorage.setItem('User', JSON.stringify(response));
                        setIsAuthenticated(true);
                        Swal.close();
                    }).catch((error) => {
                        console.log(error);
                        if(error.status === 404){
                            alertaToast({position: 'bottom', titulo: 'Usuario o clave incorrectos', icon: 'error'});
                        }else{
                            alertaFallaServidor({status: error.status, mensaje: error.message});
                        }
                    }),
            })

        }
    });

    if (!isAuthenticated) {
        return (
            <div className="container-loggin justify-content-center align-items-center"> {/* Esto es para centrar el contenido  */}
                <div className='form-loggin'>
                    <h1 className='login-title'>Iniciar Sesión</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <input type="text" name="usuario" className="form-control" required defaultValue={'@admin.com'}
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
                        <button type='submit' className='btn-loggin btn btn-success'> Iniciar Sesión </button>
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
            clave: Yup.string().required("La contraseña es obligatoria")
        };
    };

}
