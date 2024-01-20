import './StylesMesero/Mesero.css';
import '../../image/Icons/mesita/style.css';
import Tabla from '../../components/Tabla';
// import { useQuery } from '@tanstack/react-query';
import { getMesasByMesero } from '../../API/Mesas';
import { useAuth } from '../../auth/AuthProvider'; import Carrusel from '../../components/Carrusel';
import { useEffect, useState } from 'react';

export default function Mesero() {

  localStorage.removeItem("Mesa");

  const { UserId: MsroId, Nombre: NombreMesero } = useAuth();
  const [Mesas, setMesas] = useState([]); //Para la lista de mesas que traera el backend

  useEffect(() => {
    const obtenerMesas = async () => {
      const Mesas = await getMesasByMesero(MsroId);
      setMesas(Mesas);
    }
    obtenerMesas();
  }, []);

  return (
    <div>

      <Carrusel Mesas={Mesas} />

      <form className="formMesero">
        <h2 className="Linealh2" data-after-content={NombreMesero}> Mesero: </h2>
        <label className="lblMesas">Mesas
          <br />   Asignadas: </label>
        <input className="input-mesas" value={Mesas.length} readOnly />
        {/* Este input muestra la cantidad de mesas que tiene el mesero asignadas */}

        <Tabla Titulo={"Mesa a Cargo:"} Th1={"N°Mesa"} Th2={"Cantidad Clientes"} Th3={"Ocupada"}
          TextoBoton={"Tomar Pedido"} Mesas={Mesas}
        />
      </form>
    </div>
  )
}
