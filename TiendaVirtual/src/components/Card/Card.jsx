import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/Card.css';

//Componente de tarjeta de producto

export default function Card({ product }) {
    return (
        <div className='col'>
            <div className="card" style={{ width: '18rem' }} >
                <img className="card-img-top" src={product.image} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title"> {product.name} </h5>
                    <p className="card-text"> {product.description} <br /> ${product.price}
                        <button className='btn-shopping-cart'>
                            <FontAwesomeIcon className='ShoppingCart' icon={faShoppingCart}>
                            </FontAwesomeIcon>
                                <FontAwesomeIcon  icon={faPlus} />
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
