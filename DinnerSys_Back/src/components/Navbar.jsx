import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import './Navbar.css';
import { useRef, useState } from 'react';

export default function Navbar() {
    const { isAuthenticated, setIsAuthenticated, UserId, Rol } = useAuth();

    const onHandleSubmit = () => {
        // Funcion para: Cerrar Sesión
        setIsAuthenticated(false);
    }
    const auto_collapse = useRef(null);

    const handleLinkClick = () => {
        event.preventDefault();
        if(!auto_collapse.current.classList.contains('collapsed')){
            auto_collapse.current.click();
        }
    };

    if (isAuthenticated && Rol === "administrador") {
        // Navbar para el Administrador
        return (
            <>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link to={`/Admin/Home`} className="navbar-brand"> ADMIN </Link>
                        <button ref={auto_collapse} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav" >
                            <ul className='navbar-nav' >
                                <li className='nav-item'>
                                    <Link to={'/Admin/Empleados'} className='nav-link' onClick={handleLinkClick}> Empleados </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to={'/Admin/Productos'} className='nav-link' onClick={handleLinkClick}> Productos </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to={'/Admin/Categorias'} className='nav-link' onClick={handleLinkClick}> Categorias </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link to={'/Admin/Mesas'} className='nav-link' onClick={handleLinkClick}> Mesas </Link>
                                </li>
                            </ul>
                            <ul className='navbar-nav sys-log'>
                                <li className="nav-item">
                                    <button className='nav-link cerrar-sesion' onClick={() => onHandleSubmit()}> Cerrar Sesión </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section>
                    <Outlet></Outlet>
                </section>
            </>
        )
    } else if (isAuthenticated && Rol === "mesero") {
        // Navbar para el Mesero
        return (
            <>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid">
                        <Link to={`/mesero/${UserId}`} className="navbar-brand"> Mesero </Link>
                        <button ref={auto_collapse} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={`/mesero/${UserId}`} className="nav-link" onClick={handleLinkClick}> Mesas </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/mesero/${UserId}/pedidosrealizados`} className="nav-link" onClick={handleLinkClick}> Pedidos Realizados </Link>
                                </li>
                            </ul>
                            <ul className='navbar-nav sys-log'>
                                <li className="nav-item">
                                    <button className='nav-link cerrar-sesion' onClick={() => onHandleSubmit()}> Cerrar Sesión </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section>
                    <Outlet></Outlet>
                </section>
            </>
        )
    } else {
        return (
            <Outlet></Outlet>
        )
    }
}
