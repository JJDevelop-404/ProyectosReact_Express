import { useFormik } from 'formik';
import * as Yup from 'yup'; //Para validar campos del formulario
import FormCrearEditar, { alertaCrearEditar } from '../../../components/FormCrearEditar';
import { useState } from 'react';
import { nuevaCategoria } from '../../../API/Categorias';
import { useNavigate } from 'react-router-dom';

export default function Categoria({ dataCategoria, funcionEditarCategoria }) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (categoria) => {
      if(dataCategoria){ //Vamos a editar una categoria
        funcionEditarCategoria(categoria)
          .then((response) => { 
            response === true ? alertaCrearEditar('Categoria editada correctamente', 'success', ()=> navigate('/Admin/Categorias')) 
              : alertaCrearEditar('Error al editar categoria', 'error');
          });
      }else{ //Vamos a crear una nueva categoria
        nuevaCategoria(categoria)
          .then((response)=>{
            response === true ? alertaCrearEditar('Categoria creada correctamente', 'success', ()=> navigate('/Admin/Categorias')) 
              : alertaCrearEditar('Error al crear categoria', 'error');
          })
      }
    }
  })

  const [lstNombresLabels] = useState(['Nombre Categoria']);

  return (
    <>
      <FormCrearEditar formik={formik}
        nombreEntidad={'Categoria'} dataEntidad={dataCategoria ? dataCategoria : null}
        lstNombresLabels={lstNombresLabels}
        redireccionBtnRegresar={'/Admin/Categorias'}
      />
    </>
  )

  function initialValues() {
    return {
      Categoria: dataCategoria ? dataCategoria.NombreCategoria : null,
    }
  }

  function validationSchema() {
    return {
      Categoria: Yup.string().required('El nombre de la categoria es obligatorio').min(3, 'El nombre de la categoria debe tener al menos 3 caracteres')
        .max(20, 'El nombre de la categoria debe tener como maximo 20 caracteres')
    }
  }
}
