import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { AgregarProducto, ModificarProducto } from '../../../API/APIProductos';
import FormCreateEdit from '../../../components/FormCreateEdit/FormCreateEdit';
import { useNavigate } from 'react-router-dom';
import { alertaCargandoProceso } from '../../../Utils/alertas';
import './styles/CrearProducto.css';

export default function CrearProducto({ producto, accion = producto ? 'modificar' : 'crear' }) {

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
            alertaCargandoProceso({
              titulo: 'Agregando Producto',
              messageHtml: 'Espere un momento..',
              funcionAsync: ()=> AgregarProducto(newProducto),
              segundaFuncion: () => navigate('/admin/productos')
            })
            break;
          }
          case 'modificar': {
            console.log('Modificar');

            alertaCargandoProceso({
              titulo: 'Actualizando Producto',
              messageHtml: 'Espere un momento..',
              funcionAsync: () => ModificarProducto(newProducto, producto.productoId),
              segundaFuncion: () => navigate('/admin/productos')
            })

            break;
          }
        }

      } else {
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
        redirectBack={'/admin/productos'}
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
      fileUrl_imagen: Yup.mixed() //Esto es para limitar el tipo de archivo que se puede subir
        .required("Este campo es obligatorio")
        .test("fileFormat", "Formato de archivo no soportado", (value) => {
          const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
          // console.log(value);
          return value.toString().includes('http') || (value && supportedFormats.includes(value.type));
        })
    }
  }
}
