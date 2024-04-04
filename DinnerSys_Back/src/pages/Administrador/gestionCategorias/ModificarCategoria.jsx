import { useLocation } from "react-router-dom";
import Categoria from "./Categoria";
import { modificarCategoria } from "../../../API/Categorias";

export default function ModificarCategoria() {

  const location = useLocation();

  const dataCategoria = {
    ...location.state,
    Categoria: location.state.NombreCategoria
  }

  // console.log(dataCategoria);

  const editarCategoria = async (categoria) => {
    return await modificarCategoria(dataCategoria && dataCategoria.CategoriaId, categoria);
  }

  return (
    <Categoria dataCategoria={dataCategoria} funcionEditarCategoria={editarCategoria} />
  )
}
