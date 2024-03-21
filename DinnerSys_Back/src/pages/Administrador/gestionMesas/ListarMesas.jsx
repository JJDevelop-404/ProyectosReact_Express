import { useEffect, useState } from "react"
import { obtenerMesas } from "../../../API/Mesas";
import Tabla from "../../../components/Tabla";


export default function ListarMesas() {

    const [Mesas, setMesas] = useState([]);

    useEffect(()=>{
        obtenerMesas()
            .then((response)=>{
                if(response){
                    response.forEach((mesa) => {
                        mesa['Estado'] = mesa['Estado'] === 0 ? 'Disponible' : 'Ocupada';
                    })
                    setMesas(response);
                }else{
                    alert("Error al obtener mesas");
                    console.log("Error al obtener mesas");
                }
            })
    },[])

    const [lstTitulosTabla] = useState(['N° Mesa', 'Estado']);

    return (
        <>
            <Tabla NombreEntidad={'Mesas'} lstDataEntidad={Mesas} lstTitulosTabla={lstTitulosTabla}/>
        </>
    )
}
