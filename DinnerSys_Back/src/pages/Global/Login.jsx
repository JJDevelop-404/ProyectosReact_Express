import './styles/Login.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { VerifyLoggin } from '../../API/Usuarios';
import { useAuth } from '../../auth/AuthProvider';

export default function Login() {
  const { isAuthenticated, setIsAuthenticated, UserId, setUserId, Rol, setRol } = useAuth();

  const navigate = useNavigate();
  const [Usercorreo, setUserCorreo] = useState('');
  const [Userclave, setUserClave] = useState('');

  const Loggin = async () => {

    const MeseroF = await VerifyLoggin(Usercorreo, Userclave);
    console.log(MeseroF);

    if (MeseroF) {
      // console.log(MeseroF);
      localStorage.setItem('User', JSON.stringify(MeseroF));
      setIsAuthenticated(true);
      if (MeseroF.rol === "administrador") {
        navigate(`/Admin`);
      } else if (MeseroF.rol === "mesero") {
        navigate(`/Mesero/${MeseroF.id}`);
      }
    } else {
      alert("Usuario o Clave incorrectos");
    }
  }

  if (isAuthenticated && Rol === "mesero") {
    return <Navigate to={`/Mesero/${UserId}`} />;

  } else if (isAuthenticated && Rol === "administrador") {
    return <Navigate to={`/Admin`} />;

  } else {
    return (
      <div>
        <form className="formLogin" onSubmit={ev => {
          ev.preventDefault();
          Loggin();
        }
        }>
          <div className="circle">
            <i className="fas fa-user"></i>
          </div>

          <h2 className="title-loggin"> Inicio Sesión </h2>

          <div className="user-box">
            <input className='Usercorreo' required type='text' onChange={ev => setUserCorreo(ev.target.value)} />
            <label>  Usuario </label>
          </div>

          <div className='user-box'>
            <input className='Userclave' required type='password' onChange={ev => setUserClave(ev.target.value)} />
            <label> Contraseña </label>
          </div>
          <div className="botonCen">
            <button className="btnFormularios"> Iniciar Sesión </button>
          </div>
        </form>
      </div>
    )
  }
}
