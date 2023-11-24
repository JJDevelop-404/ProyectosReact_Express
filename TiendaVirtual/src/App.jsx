import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './components/Card/Card';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function App() {

  // Por ahora esta app no tiene ninguna funcion

  const products = [
    { id: 1, name: 'Nike X Off-White', description: 'Black Edition', price: "120.000", image: '../public/images/productos/nikexoffwhite.png' },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 39.99, image: '../public/images/productos/Jordan1.png' },
    { id: 3, name: 'Product 3', description: 'Description 3', price: 29.99, image: 'https://i.pinimg.com/736x/f3/3e/e4/f33ee46d86156a7348eb148c25b57d98.jpg' },
    { id: 4, name: 'Product 4', description: 'Description 4', price: 19.99, image: 'https://i.pinimg.com/564x/1a/69/6e/1a696e7ea639f57fb4c22807346071a7.jpg' },
    { id: 5, name: 'Product 5', description: 'Description 5', price: 49.99, image: 'url5' },
    { id: 6, name: 'Product 6', description: 'Description 6', price: 39.99, image: 'url6' },
    { id: 7, name: 'Product 7', description: 'Description 7', price: 29.99, image: 'url7' },
    { id: 8, name: 'Product 8', description: 'Description 8', price: 19.99, image: 'url8' },
    { id: 9, name: 'Product 9', description: 'Description 9', price: 49.99, image: 'url9' },

    // ... otros productos
  ];

  return (
    <>
      <div className='container text'>
        <h1 className='text-center'>
          Tienda Virtual
        </h1>
        <div className='row row-cols'>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
