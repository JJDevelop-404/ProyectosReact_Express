import { useState, useEffect } from "react";
import Tabla, { alertEliminar } from "../../../components/Tabla";
import { eliminarCategoria, getCategorias } from "../../../API/Categorias";

export default function ListarCategorias() {
    const [Categorias, setCategorias] = useState([]);

    useEffect(()=>{
        getCategorias()
            .then((response) => {
                if(response){
                    setCategorias(response);
                    console.log(response);
                }else{
                    console.log("Error al cargar las categorias");
                    alert("Error al cargar las categorias");
                }
            })
    },[]);

    const onEliminarCategoria = (categoriaId) => {
        eliminarCategoria(categoriaId)
            .then((response)=>{
                response ? alertEliminar('Categoria eliminada correctamente', 'success', setCategorias(Categorias.filter((categoria) => categoria.CategoriaId !== categoriaId))) 
                : alertEliminar('Error al eliminar categoria', 'error');
            });
    }

    const [Titulos] = useState(['ID', 'Nombre']);

    return (
        <Tabla NombreEntidad={"Categorias"} lstTitulosTabla={Titulos} lstDataEntidad={Categorias} 
           FuncionBtnEliminar={onEliminarCategoria} 
           RedireccionBotonCrear={'/Admin/Categorias/NuevaCategoria'} RedireccionBtnEditar={'/Admin/Categorias/EditarCategoria'}
        />
    )
}
