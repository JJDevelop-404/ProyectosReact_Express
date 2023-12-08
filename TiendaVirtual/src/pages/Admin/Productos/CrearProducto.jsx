import './styles/CrearProducto.css';
import { useFormik } from 'formik';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import { AgregarProducto, ModificarProducto } from '../../../API/APIProductos';
import { useNavigate, useParams } from 'react-router-dom';

export default function CrearProducto({ titulo, producto, accion = 'crear' }) {

  const navigate = useNavigate(); // Para navegar entre paginas

  const { ProductoId } = useParams();//Obtenemos el id del producto que se va a modificar

  const [inputActivo, setInputActivo] = useState(''); // Para el manejo del mensaje de error de los inputs

  const [image, setImage] = useState(producto ? producto.URLImagen : null); // Para el manejo del archivo de la imagen
  /*Esto lo hacemos para que si existe un producto y no se va a modificar la imagen, tenga ya la ruta guardada y es lo que enviaremos, no el archivo de la imagen
  sino la ruta de la imagen, repito, solo para modificar*/

  //Esta variable se usará para mostrar la imagen en pantalla
  const [contentUpload, setContentUpload] = useState(producto ? producto.URLImagen : 'Arrastra o selecciona una imagen'); // Para el manejo del texto del drag and drop

  //Esta funcion es para mostrar la imagen en pantalla y se activara cuando se haga click en el input tipo file
  const onHandleDrag = (ev) => {

    if (ev.target.files[0]) {//Preguntamos si existe una imagen
      setImage(ev.target.files[0]); // Se obtiene la imagen
      // Si existe una imagen entonces se muestra en pantalla
      const reader = new FileReader(); // Se crea un objeto de tipo FileReader
      /* Esto es para que se lea el archivo de la imagen y se convierta en binario
      y se pueda mostrar en pantalla */
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = (ev) => {
        ev.preventDefault();
        setContentUpload(ev.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    } else {
      //En caso de que no exista nada, enviamos null a image, y el mensaje de arrastra o selecciona una imagen
      setContentUpload('Arrastra o selecciona una imagen');
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
      if (image) { // Si existe una imagen entonces se envia el formulario
        const newProducto = new FormData();
        newProducto.append('nombre', formData.nombre);
        newProducto.append('descripcion', formData.descripcion);
        newProducto.append('precio', formData.precio);
        newProducto.append('image', image);
        // Agregamos todos nuestros datos al objeto newProducto que es un FormData ya que este contiene una imagen 
        // y la imagen no se puede enviar en formato JSON

        switch (accion) {
          case 'crear': {
            console.log('Crear');
            AgregarProducto(newProducto)
              .then((response) => {
                if(response){
                  alert("Producto Creado");
                  navigate('/admin/productos'); 
                }
              })
            break;
          }
          case 'modificar': {
            console.log('Modificar');
            ModificarProducto(newProducto, ProductoId).then((response) => {
              if(response){
                alert("Producto Modificado");
                navigate('/admin/productos');

              }
            }).catch((error) => {
              console.log(error);
            })
            break;
          }

        }
      }
    }
  });

  return (
    <div className="crearProducto">
      <div className="d-flex justify-content-center align-items-center"> {/* Esto es para centrar el contenido  */}
        <div className='col-md-4'> {/* Esto es para el tamño de los input  */}
          <h1 className="form-title"> {titulo ? titulo.EncabezadoFormulario : 'Nuevo Producto'} </h1>
          <form onSubmit={formik.handleSubmit} encType='multipart'>

            <div className="form-group">
              <input type="text" className="form-control" name="nombre" required defaultValue={producto ? producto.Nombre : ''}
                onFocus={() => setInputActivo('nombre')}
                onBlur={() => setInputActivo('')}
                onChange={formik.handleChange}
              />

              <label className="form-label">Nombre {formik.errors.nombre ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
              {inputActivo === 'nombre' && <span className="error-msj"> {formik.errors.nombre} </span>}
            </div>

            <div className="form-group">
              <input type="text" className="form-control" name="descripcion" required defaultValue={producto ? producto.Descripcion : ''}
                onFocus={() => setInputActivo('descripcion')}
                onBlur={() => setInputActivo('')}
                onChange={formik.handleChange}
              />
              <label className="form-label">Descripción {formik.errors.descripcion ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />}  </label>
              {inputActivo === 'descripcion' && <span className="error-msj"> {formik.errors.descripcion} </span>}
            </div>

            <div className="form-group">
              <input type="text" className="form-control" name="precio" required defaultValue={producto ? producto.Precio : null}
                onFocus={() => setInputActivo('precio')}
                onBlur={() => setInputActivo('')}
                onChange={formik.handleChange}
              />
              <label className="form-label">Precio {formik.errors.precio ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
              {inputActivo === 'precio' && <span className="error-msj"> {formik.errors.precio} </span>}
            </div>

            <div className="form-group drag-drop-image">
              <input type='file' className="form-control form-control-sm" name="url_imagen" required={!formik.values.url_imagen} accept="image/png, image/jpeg, image/jpg"
                onFocus={() => setInputActivo('url_imagen')}
                onBlur={() => setInputActivo('')}
                onChange={(ev) => { formik.handleChange(ev); onHandleDrag(ev); }}
              />
              <div className="text-upload">
                {formik.values.url_imagen ? <img src={contentUpload} alt="Imagen" className='img-drop' /> : <p> {contentUpload} </p>}
              </div>
            </div>
            
            <label className="form-label-file"> Imagen {formik.errors.url_imagen ? <FontAwesomeIcon className='error' icon={faExclamationTriangle} beat /> : <FontAwesomeIcon className='ok' icon={faCheck} />} </label>
            {inputActivo === 'url_imagen' && <span className="error-msj"> {formik.errors.url_imagen} </span>}

            <button type='submit' className='btn btn-success'> {titulo ? titulo.BotonSubmit : 'Agregar Producto'} </button>

          </form>
        </div>
      </div>
    </div>
  );

  function initialValues() {
    return {
      nombre: producto ? producto.Nombre : null,
      descripcion: producto ? producto.Descripcion : null,
      precio: producto ? producto.Precio : null,
      url_imagen: producto ? producto.URLImagen : null,
    };
  }

  function validationSchema() {
    return {
      nombre: Yup.string().required("Este campo es obligatorio"),
      descripcion: Yup.string().required("Este campo es obligatorio"),
      precio: Yup.number().typeError("Este campo debe contener valores numericos").required("Este campo es obligatorio"),
      url_imagen: Yup.string().required("Este campo es obligatorio"),
    };
  }
}
