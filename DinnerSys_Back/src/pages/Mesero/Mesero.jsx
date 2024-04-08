import './StylesMesero/Mesero.css';
import '../../image/Icons/mesita/style.css';
import { useEffect, useState } from 'react';
import { obtenerMesas } from '../../API/Mesas';
import Carrusel from '../../components/Carrusel';

export default function Mesero() {

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
