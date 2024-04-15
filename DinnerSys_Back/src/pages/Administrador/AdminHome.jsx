import { useAuth } from '../../auth/AuthProvider';
import './AdminHome.css';

export default function AdminHome() {

  const { Nombre: NombreUsuario } = useAuth();

  return (
    <>
      <div className="container-admin-home">
        <h1> BIENVENIDO DE NUEVO </h1>
        <h2> {NombreUsuario} </h2>
      </div>
    </>
  )
}
