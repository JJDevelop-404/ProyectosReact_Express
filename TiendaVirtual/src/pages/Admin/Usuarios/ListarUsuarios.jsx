import { useEffect, useState } from "react"
import TablaListar from "../../../components/TablaListar/TablaListar"
import { getUsuarios } from "../../../API/APIUsuarios";

export default function ListarUsuarios() {
    const [lstUsuarios, setLstUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios()
            .then((response) => {
                if(response){
                    console.log(response);
                    setLstUsuarios(response);
                }else{
                    console.log("No hay usuarios que mostrar");
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const lstTitulos = ['Id','Nombres', 'Apellidos', 'Rol'];

    return (
        <TablaListar lstTitlesTable={lstTitulos} lstDataEntity={lstUsuarios} 
            redirectionBtnEdit={'/Admin/Usuarios'}
            nameEntity={'Usuarios'} 
        />
    )
}