import { useFormik } from "formik";
import * as Yup from 'yup';
import FormCrearEditar, { alertaCrearEditar } from "../../../components/FormCrearEditar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nuevoProducto } from "../../../API/Productos.js";
import { getCategorias } from "../../../API/Categorias.js";

export default function Producto({ dataProducto, funcionEditarProducto }) {
    const navigate = useNavigate();

    const [lstCategorias, setLstCategorias] = useState(null);

    useEffect(() => {
        getCategorias()
            .then((response) => {
                if (response) {
                    // console.log(response);
                    response.map((res) => {delete res.CategoriaId })
                    setLstCategorias(response);
                } else {
                    console.log("No fue posible traer las categorias");
                    alert("No fue posible traer las categorias");
                }
            })
    }, [])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (producto) => {
            if (dataProducto) {//Vamos a editar un producto
                console.log(producto);
                const updateProducto = {
                    ...producto,
                    NombreCategoria: producto.cbxCategoria
                }
                delete updateProducto.cbxCategoria;
                console.log(updateProducto);
                funcionEditarProducto(updateProducto).then((res) => {
                    res === true ?
                        alertaCrearEditar('Producto editado correctamente', 'success', () => navigate('/Admin/Productos'))
                        : alertaCrearEditar('Error al editar el producto', 'error');

                });
            } else { //Vamos a crear un producto
                // console.log(formik.values);
                const objProducto = {
                    ...producto,
                    Categoria: formik.values.cbxCategoria
                }
                delete objProducto.cbxCategoria;

                console.log(objProducto);
                nuevoProducto(objProducto).then((res) => {
                    res === true ?
                        alertaCrearEditar('Producto creado correctamente', 'success', () => navigate('/Admin/Productos'))
                        : alertaCrearEditar('Error al crear el producto', 'error');
                });
            }
        }
    });

    const [lstNombresLabels] = useState(['Nombre', 'Descripcion', 'Precio']);
    const [lstNombresSelect] = useState(['Categoria'])

    return (
        <>
            {lstCategorias && (
                <FormCrearEditar formik={formik}
                    nombreEntidad={'Producto'} dataEntidad={dataProducto ? dataProducto : null}
                    lstNombresLabels={lstNombresLabels}
                    lstNombresSelects={lstNombresSelect} lstSelectOptions={lstCategorias}
                    redireccionBtnRegresar={'/Admin/Productos'}
                />
            )
            }
        </>
    )

    function initialValues() {
        return {
            Nombre: dataProducto ? dataProducto.Nombre : null,
            Descripcion: dataProducto ? dataProducto.Descripcion : null,
            Precio: dataProducto ? dataProducto.Precio : null,
            cbxCategoria: dataProducto ? dataProducto.cbxCategoria : null
        }
    }

    function validationSchema() {
        return {
            Nombre: Yup.string().required('Ingrese un Nombre').matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d10-9]*$/, 'El nombre no debe contener ni < > ni { }')
                .min(2, 'El nombre debe tener minimo 2 caracteres').max(100, 'El nombre debe tener maximo 100 caracteres'),
            Descripcion: Yup.string().required('Ingrese una Descripcion')
                .min(6, 'La descripcion debe tener minimo 6 caracteres').max(200, 'La descripcion debe tener maximo 200 caracteres'),
            Precio: Yup.string().required('Ingrese un Precio'),
            cbxCategoria: Yup.string().required('Escoja una Categoria')
        }
    }
}