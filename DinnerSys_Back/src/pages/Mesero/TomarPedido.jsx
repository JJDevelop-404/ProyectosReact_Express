import { getCategorias } from '../../API/Categorias';
import { getProductos } from '../../API/Productos';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { alertError } from '../../components/Tabla';
import { modificarPedido, nuevoPedido } from '../../API/Pedidos';
import { alertaCrearEditar } from '../../components/FormCrearEditar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './StylesMesero/TomarPedido.css';

export default function Pedido() {

  const navigate = useNavigate();

  const { UserId: MeseroId } = useAuth();

  const location = useLocation();
  //Variables para manejo de creacion o edicion, en este caso, esta nos llega desde pedidos realizados y desde Mesero->Carrusel
  const Numero_Mesa = location.state ? location.state.MesaId : null;

  //Variables que llegaran desde PedidosRealizados para la modificacion del pedido
  const lstProductosModificar = location.state ? location.state.lstProductos : [];
  const PedidoId = location.state ? location.state.PedidoId : null;

  //Esta no es usada para la modificacion, solo para visualización
  const PrecioTotalPedido = location.state ? location.state.PrecioTotalPedido : null;

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [desplegarDescripcion, setDesplegarDescripcion] = useState(false);

  useEffect(() => {
    getProductos()
      .then((response) => {
        response ? setProductos(response) : setProductos([]);
      });
    getCategorias()
      .then((response) => {
        response ? setCategorias(response) : setCategorias([]);
      });
  }, []);


  const toggleDescripcion = (productoId) => {
    setDesplegarDescripcion(desplegarDescripcion === productoId ? false : productoId);
  };

  //Variable para manejar el guardado de productos, estructura: [[id, cantidad]]
  const [lstIdProductos, setLstIdProductos] = useState(lstProductosModificar ? lstProductosModificar : []);

  //Variable para manejar el precio total de los productos
  const [totalPedido, setTotalPedido] = useState(PrecioTotalPedido ? PrecioTotalPedido : 0);

  //Funcion para cuando se le de click al precio de un producto (debe agregar a la lista lstIdProductos)
  const onHandleClickInPrecio = (productoId, precio) => {

    const infoProducto = [productoId, 1, precio]; //Variable que contiene el producto y la cantidad

    const isExistsProducto = lstIdProductos.find(([id]) => id === productoId);

    if (isExistsProducto) {
      agregarOquitarProducto(productoId, true);
    } else {
      setLstIdProductos((prevList) => {
        const lstProductosOrdenados = [...prevList, infoProducto];
        calcularTotal(lstProductosOrdenados);
        return lstProductosOrdenados;
      });
    }
    // console.log(lstIdProductos);
  }
  //Funcion para aumentar la variable cantidad en la lista lstIdProductos
  const onHandleClickAgregar = (productoId) => {
    agregarOquitarProducto(productoId, true);
  }

  //Funcion para disminuir la variable cantidad en la lista lstIdProductos
  const onHandleClickDisminuir = (productoId) => {
    agregarOquitarProducto(productoId, false);
  }

  // Variables para la busqueda de productos
  const [inputBuscar, setInputBuscar] = useState('');
  const [filtro, setFiltro] = useState(['nombre', '', inputBuscar]);


  const onHandleFiltrar = (valueSelect) => {
    if (valueSelect === "nombre") {
      setFiltro(['nombre', '', inputBuscar]);
    } else if (valueSelect === "categoria") {
      setFiltro(['categoria', 'Comidas', inputBuscar]);
    } else if (valueSelect === 'precio_mayor') {
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

  });

  //Funcion para el boton ordenar
  const onHandleClickOrdenar = () => {
    if (lstIdProductos.length === 0) {
      alertError('No hay productos en el pedido', 'Agregue productos al pedido');
    } else {
      const lstProductos = lstIdProductos.map(([id, cantidad]) => {
        return { ProductoId: id, Cantidad: cantidad };
      });
      if (lstProductosModificar === undefined) {
        nuevoPedido(Numero_Mesa && Numero_Mesa, MeseroId, lstProductos)
          .then((response) => {

            response ? alertaCrearEditar('Pedido Agregado', 'success', () => navigate(`/Mesero/${MeseroId}/pedidosRealizados`))
              : alertError('Error al agregar el pedido', 'Intente de nuevo');
          })
      } else if (lstProductosModificar && lstProductosModificar.length > 0 && PedidoId) {
        //Vamos a editar un pedido
        
        modificarPedido(PedidoId, lstProductos)
          .then((response) => {
            response ? alertaCrearEditar('Pedido Modificado', 'success', () => navigate(`/Mesero/${MeseroId}/pedidosRealizados`))
              : alertError('Error al modificar el pedido', 'Intente de nuevo');
          })

      }
    }
  }

  return Numero_Mesa && Numero_Mesa && MeseroId ? (

    <>
      <div className="container pedido">

        <h2 className='title-pedido'>Menú</h2>

        <div className="container-filtros">
          <input className='input-buscar' type="text" placeholder="Buscar Producto" onChange={(ev) => { setInputBuscar(ev.target.value), setFiltro([filtro[0], filtro[1], ev.target.value]) }} />
          <select onChange={(ev) => onHandleFiltrar(ev.target.value)} className='select-filtros'>
            <option value="nombre">Nombre</option>
            <option value="categoria">Categoria</option>
          </select>
          {filtro && filtro[0] === 'categoria' &&
            <select className='select-filtros' onChange={(ev) => { setFiltro([filtro[0], ev.target.value, inputBuscar]) }} >
              <option value="0"> --Seleccione-- </option>
              {categorias && categorias.map((categoria) => (
                <option key={categoria.CategoriaId} value={categoria.NombreCategoria}>{categoria.NombreCategoria}</option>
              ))}
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
              <h3 className='pr-precio' onClick={() => onHandleClickInPrecio(producto.ProductoId, producto.Precio)}>${producto.Precio}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="container pedido elegido">
        <h2 className="title-pedido elegido"> Productos Escogidos </h2>
        <div className="seccion-productos elegidos">
          {lstIdProductos && lstIdProductos.map(([id, cantidad], index) => (
            <div key={index} className='listado-productos elegidos'>
              <h3 className='pr-nombre elegido'> {cantidad} <i className='fa-solid fa-angles-right' /> {productos.find((pr) => pr.ProductoId === id)?.Nombre}</h3>
              <div className="container-btn-control-pr-elegido">
                <p className='btn-agregar' onClick={() => onHandleClickAgregar(id)}> + </p>
                <p className='btn-desagregar' onClick={() => onHandleClickDisminuir(id)}> {cantidad > 1 ? "-" : <i className="fa-regular fa-trash-can" />}  </p>
              </div>
              <h3 className='pr-precio elegido'> ${productos.find((pr) => pr.ProductoId === id)?.Precio * cantidad} </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="container-info-pedido">
        <p className='align-middle precio-total-pedido'> <b>Total:</b> ${totalPedido} </p>
        <p className='align-middle informacion-pedido'> Mesa N° {Numero_Mesa} </p>
        <button className='align-middle btn-ordenar-pedido' onClick={() => onHandleClickOrdenar()} >Ordenar <i className='fa-solid fa-circle-check align-middle' /> </button>
      </div>
    </>
  ) : navigate(`/Mesero/${MeseroId}`); //Si no llega la MesaId simplemente redirige a la pagina de mesero

  function calcularTotal(listProductosOrdenados) {
    let total = 0;
    //Funcion para obtener el precio total de los productos
    listProductosOrdenados.map(([id, cantidad, precio]) => {
      total += precio;
    })
    // console.log(total);
    setTotalPedido(total);
  }

  function agregarOquitarProducto(productoId, isAgg) {
    const newList = lstIdProductos.map(([id, cantidad, precio]) => {
      if (id === productoId) {
        if (isAgg) {
          return [id, cantidad + 1, (precio += (precio / cantidad))];
        } else {
          if (cantidad > 1) {
            return [id, cantidad - 1, (precio -= (precio / cantidad))];
          } else if (cantidad === 1) {
            return null;
          }
        }
      } else {
        return [id, cantidad, precio];
      }
    }).filter(Boolean);
    /*
      filter(Boolean) elimina todos los elementos falsy (como null, undefined, 0, false, '', etc.) del array 
      resultante, dejando solo los elementos que son evaluados como verdaderos. Esto asegura que la lista final
      no contenga ningún elemento nulo. 
    */
    calcularTotal(newList);
    setLstIdProductos(newList);
  }
}
