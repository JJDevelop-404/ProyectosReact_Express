import './StylesMesero/Mesero.css';
import '../../image/Icons/mesita/style.css';
import { useAuth } from '../../auth/AuthProvider'; import Carrusel from '../../components/Carrusel';
import { useEffect, useState } from 'react';
import { obtenerMesas } from '../../API/Mesas';

export default function Mesero() {

  localStorage.removeItem("Mesa");

  const { Nombre: NombreMesero } = useAuth();

  const [Mesas, setMesas] = useState([]); //Para la lista de mesas que traera el backend
  
  useEffect(() => {
    obtenerMesas()
      .then((response) => {
        if (response) {
          console.log("Mesas obtenidas");
          setMesas(response);
        } else {
          alert("No se pudo obtener las mesas");
          console.log("No se pudo obtener las mesas");
        }
      })
  }, []);

  return (
    <>
      <Carrusel Mesas={Mesas} setMesas={setMesas} />
    </>
  )
}
