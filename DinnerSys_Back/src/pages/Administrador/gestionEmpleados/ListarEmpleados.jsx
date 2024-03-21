import { useEffect, useState } from 'react'
import { inactivarUsuario, obtenerUsuarios } from '../../../API/Usuarios';
import './ListarEmpleados.css';
import Tabla, { alertEliminar } from '../../../components/Tabla';

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

  const onEliminarUsuario = (usuarioId) => {
    inactivarUsuario(usuarioId)
      .then((response) => {
        if (response) {
          alertEliminar('Usuario eliminado correctamente', 'success', setUsuarios(Usuarios.filter((user) => user.usuarioId !== usuarioId)));
        }else{
          alertEliminar('Error al eliminar usuario', 'error');
        }
      })
  };



  const [Titulos] = useState(['ID', 'Cedula', 'Nombres', 'Apellidos', 'Tipo de Usuario']); //Contiene los titulos de la tabla

  return (
    <>
      <Tabla NombreEntidad={'Empleados'} lstTitulosTabla={Titulos} lstDataEntidad={Usuarios}
        FuncionBtnEliminar={onEliminarUsuario}
        RedireccionBotonCrear={'/Admin/Empleados/NuevoEmpleado'} RedireccionBtnEditar={'/Admin/Empleados/EditarEmpleado'} />
    </>
  )
}
