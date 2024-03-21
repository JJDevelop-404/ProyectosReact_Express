import { useLocation } from "react-router-dom";
import Producto from "./Producto";
import { modificarProducto } from "../../../API/Productos";

export default function ModificarProducto() {
  const location = useLocation();
  const dataProducto = location.state;

  const editarProducto = async (producto) => { 
      return await modificarProducto(dataProducto && dataProducto.ProductoId, producto);
  };

  return (
    <>
      <Producto dataProducto={dataProducto} funcionEditarProducto={editarProducto}/>
    </>
  )
}
