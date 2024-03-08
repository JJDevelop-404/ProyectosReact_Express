import { useEffect, useState } from 'react'
import { obtenerUsuarios } from '../../../API/Usuarios';
import { Link } from 'react-router-dom';
import './ListarEmpleados.css';
import Tabla from '../../../components/Tabla';

export default function ListarEmpleados() {

  const [Usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios()
      .then((response) => {
        if (response) {
          console.log(response);
          setUsuarios(response);
        } else {
          console.log("Error al obtener usuarios");
          alert("Error al obtener usuarios");
        }
      })
  }, []);

  const [Titulos] = useState(['ID', 'Cedula', 'Nombres', 'Apellidos', 'Tipo de Usuario']); //Contiene los titulos de la tabla

  return (
    <>
      <Tabla TituloPrincipal={'Listado de Usuarios'} lstTitulosTabla={Titulos} lstData={Usuarios} RedireccionBotonCrear={'/Admin/Empleados/NuevoEmpleado'}
        TextoBotonCrear={'Crear Empleado'}/>

    </>
  )
}
