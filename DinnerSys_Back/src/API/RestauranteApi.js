import axios from 'axios';

const RestauranteAPI = axios.create({
    baseURL: 'http://localhost:3001'
})

const Backend_URL = 'http://localhost:3003';

// CRUD PARA MESAS
// GetMesas --> Obtener todas las mesas
export const getMesas = async () => {
    const Mesas = await RestauranteAPI.get('/Mesas');
    return Mesas.data;
}

//GetMesasXMesero --> Obtener todas las mesas que tiene un mesero
export const getMesasXMesero = async (Id_Mesero) => {
    const MesasXMesero = await RestauranteAPI.get(`/Mesas/?MeseroId=${Id_Mesero}`);
    return MesasXMesero.data;
}

//GetMesasByMesero --> Obtener todas las mesas que tiene un Mesero
export const getMesasByMesero = async (MeseroId) => {
    const MesasByMesero = await axios.get(`${Backend_URL}/Mesas/getMesasByMesero/${MeseroId}`);
    return MesasByMesero.data;
}

//UpdateMesa --> Para actualizar Mesa por una NuevaMesa
export const UpdateMesa = (newMesa) => RestauranteAPI.put(`/Mesas/${newMesa.id}`, newMesa);

//DeleteMesa --> Para eliminar una Mesa por Id
export const DeleteMesa = (MesaId) => RestauranteAPI.delete(`/Mesas/${MesaId}`);

// ----------------------------------------------------------------------------------------------------------------------------
// CRUD PARA MESEROS
// GetMeseros --> Obtener todos los meseros
export const getMesero = async () => {
    const Meseros = await RestauranteAPI.get('/Meseros');
    return Meseros.data;
}

//GetMeserosId --> Obtener Mesero por Id
export const getMeseroId = async (id) => {
    const Mesero = await axios.get(`${Backend_URL}/usuarios/get/${id}`);
    return Mesero.data;
}

export const VerifyLoggin = async (usuario, clave) => {
    const Mesero = await axios.post(`${Backend_URL}/usuarios/loggin`, {usuario: usuario, clave: clave})
        .then((response) => {
            // console.log(response.data);
            return response.data;
        }).catch((error) => {
            console.log(error);
            return null;
        });
    return Mesero;
}

// ----------------------------------------------------------------------------------------------------------------------------
// CRUD PARA PRODUCTOS

//GetProductos --> Obtener Todos Los Productos}
export const getProductos = async () => {
    const lstProductos = await RestauranteAPI.get("/Productos");
    return lstProductos.data;
};

//GetProductoId --> Obtener Un Producto Por Id
export const getProductoId = async (id) => {
    const producto = await RestauranteAPI.get(`/Productos/${id}`);
    return producto.data;
};

//GetProductosIds --> Obtener Los Productos Por Una Lista De Ids
export const getProductosIds = async (lstIds) => {
    const lstProductosXIds = await RestauranteAPI.get(`/Productos/?id=${lstIds.join("&id=")}`);
    return lstProductosXIds.data;
};


// ----------------------------------------------------------------------------------------------------------------------------
// CRUD PARA PEDIDOS

//CreatePedido --> Crear Un Nuevo Pedido
export const CreatePedido = (newPedido) => RestauranteAPI.post("/Pedidos",newPedido);

//GetPedidos --> Obtener Todos Los Pedidos
export const getPedidos = async () => {
    const lstPedidos = await RestauranteAPI.get("/Pedidos");
    return lstPedidos.data;
};

//GetPedidosXMeseroId --> Obtener Todos Los Pedidos Por MeseroId 
export const getPedidosXMeseroId = async (MsroId) => {
    const lstPedidosXMesero = await RestauranteAPI.get(`/Pedidos/?MeseroId=${MsroId}`);
    return lstPedidosXMesero.data;
};

//GetPedidosXMesaId --> Obtener Todos Los Pedidos Por MesaId
export const getPedidosXMesaId = async (MesaId) => { 
    const lstPedidosXMesaId = await RestauranteAPI.get(`/Pedidos/?MesaId=${MesaId}`);
    return lstPedidosXMesaId.data;
};

//UpdatePedido --> Actualizar Un Pedido Por Un Nuevo Pedido
export const UpdatePedido = (newPedido) => RestauranteAPI.put(`/Pedidos/${newPedido.id}`,newPedido);

//DeletePedido --> Eliminar Un Pedido Por Id
export const DeletePedido = (PedidoId) => RestauranteAPI.delete(`/Pedidos/${PedidoId}`);