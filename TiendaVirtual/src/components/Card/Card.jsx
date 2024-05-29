import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/Card.css';

//Componente de tarjeta de producto

export default function Card({ lstProductos }) {
    return (
        <div className="container-card-component">
            {lstProductos.length > 0 ? lstProductos.map((producto, index) => (
                <div key={index} className='col'>
                    <div className="card" >
                        <div className="img-contenedor">
                            <button title='shop' className='btn-shopping-cart'>
                                <FontAwesomeIcon className='ShoppingCart' icon={faShoppingCart} />
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <img className="card-img-top" src={producto.URLImagen} alt="img-shoes" />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"> {producto.Nombre} </h5>
                            <p className="card-text descripcion"> {producto.Descripcion} </p>
                            <p className="card-text precio">  ${producto.Precio} </p>
                        </div>
                    </div>
                </div>
            ))
                : <h2>No llego na</h2>}
        </div>
    )
}
