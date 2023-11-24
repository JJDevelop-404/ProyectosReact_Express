import { Link, Outlet } from 'react-router-dom';
import './styles/Navbar.css';
import { useAuth } from '../../auth/AuthProvider/AuthProvider';

export default function Navbar() {
    const { Rol } = useAuth();
    
    if (Rol === null) {
        return (
            <>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"> Inicio  </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/Home" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Mmmm" className="nav-link">
                                        Mmmm
                                    </Link>
                                </li>
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
                                <li className="nav-item last">
                                    <Link to="/Nosotros" className="nav-link">
                                        Nosotros
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section>
                    <Outlet></Outlet>
                </section>
            </>
        );
    } else if (Rol === 'Admin') {
        return (
            <>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/"> Inicio  </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="true" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/Home" className="nav-link">
                                        Home
                                    </Link>
                                </li>
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
                                <li className="nav-item last">
                                    <Link to="/Nosotros" className="nav-link">
                                        Nosotros
                                    </Link>
                                </li>
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
}
