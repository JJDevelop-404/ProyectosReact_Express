import { useEffect, useState } from "react"
import { nuevaMesa, obtenerMesas } from "../../../API/Mesas";
import Tabla from "../../../components/Tabla";
import { alertaCrearEditar } from "../../../components/FormCrearEditar";

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

    const crearMesa = () => { 
        nuevaMesa()
            .then((response) => {
                response ? alertaCrearEditar('Mesa creada correctamente', 'success', ()=> window.location.reload() )
                    : alertaCrearEditar('Error al crear mesa', 'error');
            })
    };

    return (
        <>
            <Tabla NombreEntidad={'Mesas'} lstDataEntidad={Mesas} lstTitulosTabla={lstTitulosTabla} 
                MostrarAcciones={false} FuncionBtnCrear={crearMesa} />
        </>
    )
}
