import './StylesMesero/Pedido.css';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreatePedido, UpdateMesa, getProductos } from '../../API/RestauranteApi';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Pedido() {

  const { UserId: MsroId } = useAuth();
  const navigate = useNavigate();

  const [Mesa] = useState(localStorage.getItem("Mesa"));
  const [NMesa] = useState(Mesa ? (JSON.parse(Mesa).id) : null);

  const [NombreCliente, setNombreCliente] = useState('');
  const [CantidadClientes, setCantidadClientes] = useState(0);


  // Empezamos a traer los datos del JSON
  //  Traemos primeramente todos los productos 
  const { data: lstProductos } = useQuery({
    queryKey: ['Productos'],
    queryFn: getProductos,
  });

  // Creamos las variables para manipular el Precio y la lista de ids de los productos que se seleccionan
  const [PrecioTotal, setPrecioTotal] = useState(0);
  const [ProductoSeleccionado, setProductoSeleccionado] = useState([]);

  // Creamos esta funcion para obtener el precio y agregar a la lista los ids de los productos que se selecciones
  const getPrecioTotal = (producto, isChecked) => {
    if (isChecked) {
      setProductoSeleccionado([...ProductoSeleccionado, producto.id]);
      setPrecioTotal(PrecioTotal + producto.Precio);
    } else {
      setProductoSeleccionado(ProductoSeleccionado.filter((pId) => pId !== producto.id));
      setPrecioTotal(PrecioTotal - producto.Precio);
    }
  }

  const queryClient = useQueryClient();

  const ActualizarMesa = useMutation({
    mutationFn: UpdateMesa,
    onSuccess: () => {
      queryClient.invalidateQueries('Mesas');
      alert("Mesa Actualizada");
    },
    onError: (error) => {
      alert(`error: ${error}`);
    }
  });

  const NuevoPedido = useMutation({
    mutationFn: CreatePedido,
    onSuccess: () => {
      queryClient.invalidateQueries('Pedidos');
      alert("Agregado")
    },
    onError: (error) => {
      alert(`error: ${error}`);
    }
  });

  const onSubmit = () => {
    // Cuando se envie el formulario, primero actualizaremos la mesa
    if (PrecioTotal === 0) {
      alert("Escoga al menos un producto");
    } else {
      console.log(Mesa);
      ActualizarMesa.mutate({
        ...JSON.parse(Mesa),
        CantidadClientes: CantidadClientes
      });

      // Luego creamos el pedido
      let newPedido = {
        "NombreCliente": NombreCliente,
        "MesaId": NMesa,
        "MeseroId": MsroId,
        "Productos": ProductoSeleccionado,
        "PrecioTotal": PrecioTotal
      }
      NuevoPedido.mutate(newPedido);
      navigate(`/Mesero/${MsroId}`);
    }
  };


  return (
    <>
      {Mesa ?
        <div className='container-formulariosPP'>
          <form className='formPedidos' action='submit' onSubmit={(ev) => {
            ev.preventDefault();
            onSubmit();
          }} >
            <h2 className='Linealh2'>Tomar Pedido MesaN°{NMesa} </h2>
            <div className="user-box">
              <input type='text' onChange={(ev) => setNombreCliente(ev.target.value)} required />
              <label> Nombre Cliente </label>
            </div>
            <div className="user-box">
              <input type='number' min="1" max="20" onChange={(ev) => setCantidadClientes(ev.target.value)} required />
              <label> Cantidad Clientes </label>
            </div>
            <div className="user-box">
              <input type='text' value={'$' + PrecioTotal} onChange={(ev) => { }} />
              <label> Precio: </label>
            </div>

            <button className="btnFormularios"> Tomar Pedido </button>
          </form>

          <form className="formlstProductos">
            <h2 className="Linealh2">Listado Productos</h2>
            <div className="carrusel-pedidos">
              {lstProductos && lstProductos.map(producto => (
                <div key={producto.id}>
                  <label htmlFor={`producto${producto.id}`} > {producto.Producto + ': $'}<b> {producto.Precio} </b>  </label>
                  <input id={`producto${producto.id}`} type='checkbox' onClick={(ev) => getPrecioTotal(producto, ev.target.checked)} />
                  <br />
                </div>
              ))}
            </div>
          </form>

        </div>

        :

        <form className='formSinMesa'>
          <h2>NO HAY NINGUNA MESA SELECCIONADA</h2>
        </form>
      }
    </>
  )
}
