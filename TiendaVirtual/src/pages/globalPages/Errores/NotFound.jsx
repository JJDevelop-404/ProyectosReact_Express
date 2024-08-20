import { Link } from 'react-router-dom';
import './styles/NotFound.css';

export default function NotFound() {
    return (
        <div className="container-page-error">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Página no encontrada. </p>
                <p className="lead">
                    La página que buscas no existe.
                </p>
                <Link to="/" className="btn btn-primary"> Redirigir </Link>
            </div>
        </div>
    )
}
