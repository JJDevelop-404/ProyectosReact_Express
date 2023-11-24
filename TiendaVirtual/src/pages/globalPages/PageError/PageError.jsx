import { Link } from 'react-router-dom';
import './styles/PageError.css';

export default function PageError() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found. </p>
                <p className="lead">
                    La página que buscas no existe o no se encuentra disponible.
                </p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>
    )
}
