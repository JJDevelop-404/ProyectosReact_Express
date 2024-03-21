import { useFormik } from "formik";
import * as Yup from 'yup';
import FormCrearEditar, { alertaCrearEditar } from "../../../components/FormCrearEditar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Producto({ dataProducto, funcionEditarProducto }) {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (producto) => {
            if (dataProducto) {//Vamos a editar un producto
                funcionEditarProducto(producto).then((res) => {
                    if (res === true) {
                        alertaCrearEditar('Producto editado correctamente', 'success', () => navigate('/Admin/Productos'));
                    } else {
                        alertaCrearEditar('Error al editar el producto', 'error');
                    }
                })
            }
        }
    });

    const [lstNombresLabels] = useState(['Nombre', 'Descripcion', 'Categoria', 'Precio']);

    return (
        <>
            <FormCrearEditar formik={formik}
                nombreEntidad={'Producto'} dataEntidad={dataProducto ? dataProducto : null}
                lstNombresLabels={lstNombresLabels}
                redireccionBtnRegresar={'/Admin/Productos'}
            />
        </>
    )

    function initialValues() {
        return {
            Nombre: dataProducto ? dataProducto.Nombre : null,
            Descripcion: dataProducto ? dataProducto.Descripcion : null,
            Categoria: dataProducto ? dataProducto.Categoria : null,
            Precio: dataProducto ? dataProducto.Precio : null,
        }
    }

    function validationSchema() {
        return {
            Nombre: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/, 'El nombre debe ser alfabetico')
                .min(2, 'El nombre debe tener minimo 2 caracteres').max(50, 'El nombre debe tener maximo 50 caracteres'),
            Descripcion: Yup.string().required('Ingrese una Descripcion')
                .min(6, 'La descripcion debe tener minimo 6 caracteres').max(50, 'La descripcion debe tener maximo 50 caracteres'),
            Categoria: Yup.string().required('Ingrese una Categoria').matches(/^[a-zA-Z]+(\s*[a-zA-Z]*)*[a-zA-Z]+$/, 'La categoria debe ser alfabetica')
                .min(3, 'La categoria debe tener minimo 3 caracteres').max(30, 'La categoria debe tener maximo 30 caracteres'),
            Precio: Yup.string().required('Ingrese un Precio')
        }
    }
}