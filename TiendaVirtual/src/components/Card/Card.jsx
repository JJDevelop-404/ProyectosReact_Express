import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/Card.css';

//Componente de tarjeta de producto

export default function Card({ producto }) {
    return (
        <div className='col'>
            <div className="card" >
                <div className="img-contenedor">
                    <img className="card-img-top" src={producto.URLImagen} alt="img-shoes" />
                </div>
                <div className="card-body">
                    <h5 className="card-title"> {producto.Nombre} </h5>
                    <p className="card-text"> {producto.Descripcion} <br /> ${producto.Precio}
                        <button className='btn-shopping-cart'>
                            <FontAwesomeIcon className='ShoppingCart' icon={faShoppingCart}>
                            </FontAwesomeIcon>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
