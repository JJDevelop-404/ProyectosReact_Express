import { getProductos } from '../../API/Productos';
import './StylesMesero/Pedido.css';
import React, { useEffect, useState } from 'react';

export default function Pedido() {
  const [productos, setProductos] = useState([]);
  const [desplegarDescripcion, setDesplegarDescripcion] = useState(false);

  let lstIdProductos = [];

  useEffect(() => {
    getProductos()
      .then((response) => {
        response ? setProductos(response) : setProductos([]);
      });
  }, []);


  const toggleDescripcion = (productoId) => {
    setDesplegarDescripcion(desplegarDescripcion === productoId ? false : productoId);
  };

  const togglePrecio = (productoId) => {
    lstIdProductos.push(productoId);
    console.log(lstIdProductos);
  }
  
  const [filtro, setFiltro] = useState(null);

  const onHandleFiltrar = (value) => {
    if (value === "categoria") {
      setFiltro('Postres');
    }else{
      setFiltro(null);
    }
  }
  
  const productosFiltrados = productos.filter((producto) => {
    return filtro === null ?  producto :
    producto.Categoria.includes(filtro) 
  })

  return (
    <div className="container pedido">
      
      <h2 className='title-pedido'>Productos</h2>

      <div className="container-filtros">
        <input className='input-buscar' type="text" placeholder="Buscar Producto" />
        <select onChange={(ev)=>onHandleFiltrar(ev.target.value)} className='select-filtros'>
          <option value="0">Filtrar Por</option>
          <option value="nombre">Nombre</option>
          <option value="categoria">Categoria</option>
          <option value="precio_mayor">Precio Mayor a Menor</option>
          <option value="precio_menor">Precio Menor a Mayor</option>
        </select>
      </div>


      <div className='seccion-productos'>
        {productosFiltrados.map((producto) => (
          <div key={producto.ProductoId} className='listado-productos'>
            <h3 className='pr-nombre' onClick={() => toggleDescripcion(producto.ProductoId)}>
              {producto.Nombre} <i className={desplegarDescripcion === producto.ProductoId ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'} ></i>
              {desplegarDescripcion === producto.ProductoId ? <p className='pr-descripcion' onClick={() => toggleDescripcion(producto.ProductoId)}> {producto.Descripcion} </p> : null}
            </h3>
            <h3 className='pr-precio' onClick={() => togglePrecio(producto.ProductoId)}>${producto.Precio}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
