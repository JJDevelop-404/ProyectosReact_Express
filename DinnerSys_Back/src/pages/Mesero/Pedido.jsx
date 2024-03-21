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

  const onHandleClickInPrecio = (productoId) => {
    lstIdProductos.push(productoId);
    console.log(lstIdProductos);
  }

  // Variables para la busqueda de productos
  const [inputBuscar, setInputBuscar] = useState('');
  const [filtro, setFiltro] = useState(['nombre', '', inputBuscar]);


  const onHandleFiltrar = (valueSelect) => {
    if (valueSelect === "nombre") {
      setFiltro(['nombre', '', inputBuscar]);
    } else if (valueSelect === "categoria") {
      setFiltro(['categoria', 'Comidas', inputBuscar]);
    }else if (valueSelect === 'precio_mayor'){
      setFiltro(['precio_mayor', '', inputBuscar])
    
    } else {
      setFiltro(null);
    }
  }

  const productosFiltrados = productos.filter((producto) => {
    // console.log(filtro);
    return filtro && filtro[0] === 'nombre' ? producto.Nombre.toLowerCase().includes(filtro[2].toLowerCase()) :
      filtro && filtro[0] === 'categoria' ? producto.Categoria === filtro[1] && producto.Nombre.toLowerCase().includes(filtro[2].toLowerCase()) :
        producto;

  })

  return (
    <div className="container pedido">

      <h2 className='title-pedido'>Productos</h2>

      <div className="container-filtros">
        <input className='input-buscar' type="text" placeholder="Buscar Producto" onChange={(ev) => { setInputBuscar(ev.target.value), setFiltro([filtro[0], filtro[1], ev.target.value]) }} />
        <select onChange={(ev) => onHandleFiltrar(ev.target.value)} className='select-filtros'>
          <option value="nombre">Nombre</option>
          <option value="categoria">Categoria</option>
          {/* <option value="precio_mayor">Precio Mayor a Menor</option>
          <option value="precio_menor">Precio Menor a Mayor</option> */}
        </select>
        {filtro && filtro[0] === 'categoria' &&
          <select className='select-filtros' onChange={(ev) => { setFiltro([filtro[0], ev.target.value, inputBuscar]) }} >
            <option value="Comidas"> Comidas </option>
            <option value="Bebidas"> Bebidas </option>
            <option value="Postres"> Postres </option>
          </select>
        }
      </div>


      <div className='seccion-productos'>
        {productosFiltrados.map((producto) => (
          <div key={producto.ProductoId} className='listado-productos'>
            <h3 className='pr-nombre' onClick={() => toggleDescripcion(producto.ProductoId)}>
              {producto.Nombre} <i className={desplegarDescripcion === producto.ProductoId ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'} ></i>
              {desplegarDescripcion === producto.ProductoId ? <p className='pr-descripcion' onClick={() => toggleDescripcion(producto.ProductoId)}> {producto.Descripcion} </p> : null}
            </h3>
            <h3 className='pr-precio' onClick={() => onHandleClickInPrecio(producto.ProductoId)}>${producto.Precio}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
