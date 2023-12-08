import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import './styles/Navbar.css';

export default function Navbar() {
    const { Rol, isAuthenticated, setIsAuthenticated } = useAuth();
    const onHandleClick = () => {
        setIsAuthenticated(false);
        window.location.reload();
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
                        <ul className="navbar-nav">
                            {Rol === null &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Marcas
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/Nike" className="dropdown-item">
                                                Nike <i className="icon icon-Nike"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Adidas" className="dropdown-item">
                                                Adidas <i className='icon icon-Adidas' />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Puma" className="dropdown-item">
                                                Puma <i className="icon icon-Puma" />
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            }
                            {Rol === "Admin" &&
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Productos
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/Admin/Productos" className="dropdown-item">
                                                Ver Productos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Admin/Productos/CrearProducto" className="dropdown-item">
                                                Crear Producto
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            }
                        </ul>
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
                <Outlet></Outlet>
            </section>
        </>
    );
}
