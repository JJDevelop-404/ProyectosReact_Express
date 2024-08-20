import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

export default function Navbar() {
    const { Rol, isAuthenticated, setIsAuthenticated } = useAuth();

    const onHandleClick = () => {
        setIsAuthenticated(false);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">


                    <Link className="navbar-brand" to="/"> Inicio  </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        {(Rol === "" || Rol === "cliente") &&
                            <ul className="navbar-nav">
                                <li className='nav-item'>
                                    <Link to="/Superiores" className="nav-link">
                                        Camisas
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Inferiores" className="nav-link">
                                        Pantalones
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Zapatillas" className="nav-link">
                                        Zapatillas
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to="/Accesorios" className="nav-link">
                                        Accesorios
                                    </Link>
                                </li>
                            </ul>
                        }
                        {Rol.includes("admin") &&
                            <ul className='navbar-nav'>
                                <li className="nav-item">
                                    <Link to={'/Admin/Productos'} className="nav-link">
                                        Productos
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/Admin/Usuarios'} className="nav-link">
                                        Usuarios
                                    </Link>
                                </li>
                            </ul>
                        }
                        <ul className="nav sys-log">
                            {/* Mostrar iniciar o cerrar sesion */}
                            {!isAuthenticated ?
                                <li className="nav-item li-sys-log">
                                    <Link to="/InicioSesion" className="nav-log">
                                        Iniciar Sesión <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                </li>
                                :
                                <li className="nav-item li-sys-log">
                                    <button className="nav-log" onClick={() => onHandleClick()}> Cerrar Sesión <FontAwesomeIcon icon={faSignInAlt} /> </button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <section>
                <Outlet />
            </section>
        </>
    );
}
