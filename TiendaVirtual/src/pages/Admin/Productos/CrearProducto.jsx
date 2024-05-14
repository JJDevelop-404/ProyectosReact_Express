import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { AgregarProducto, ModificarProducto } from '../../../API/APIProductos';
import FormCreateEdit from '../../../components/FormCreateEdit/FormCreateEdit';
import './styles/CrearProducto.css';
import { useNavigate } from 'react-router-dom';

export default function CrearProducto({ titulo, producto, accion =  producto ? 'modificar' : 'crear'}) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
      if (formik.values.fileUrl_imagen) { // Si existe una imagen entonces se envia el formulario
        const newProducto = new FormData();
        newProducto.append('nombre', formData.nombre);
        newProducto.append('descripcion', formData.descripcion);
        newProducto.append('precio', formData.precio);
        newProducto.append('image', formData.fileUrl_imagen);
        console.log(newProducto.get('image'));
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
            ModificarProducto(newProducto, producto.productoId).then((response) => {
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
      }else{
        alert("Debe seleccionar una imagen para el producto");
      }
    }
  });

  const [lstNameLabels] = useState(['Nombre', 'Descripcion', 'Precio']);
  const [lstInputsFileImage] = useState([['Producto', 'image/png, image/jpg, image/jpeg']]);

  return (
    <div className="crearProducto">
      <FormCreateEdit
        nameEntity={'Producto'}
        lstNameLabels={lstNameLabels} lstInputsFileImage={lstInputsFileImage}
        formik={formik} dataEntity={producto ? producto : null}
      />
    </div>
  );

  function initialValues() {
    return {
      nombre: producto ? producto.nombre : null,
      descripcion: producto ? producto.descripcion : null,
      precio: producto ? producto.precio : null,
      fileUrl_imagen: producto ? producto.fileUrl_imagen : null,
    };
  }

  function validationSchema() {
    return {
      nombre: Yup.string().required("Este campo es obligatorio"),
      descripcion: Yup.string().required("Este campo es obligatorio"),
      precio: Yup.number().typeError("Este campo debe contener valores numericos").required("Este campo es obligatorio"),
      fileUrl_imagen: Yup.string().required("Este campo es obligatorio"),
    };
  }
}
