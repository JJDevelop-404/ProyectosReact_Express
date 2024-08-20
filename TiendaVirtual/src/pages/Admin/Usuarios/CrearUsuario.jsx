import { useFormik } from "formik"
import * as Yup from 'yup'
import { useState } from "react";
import FormCreateEdit from "../../../components/FormCreateEdit/FormCreateEdit";

export default function CrearUsuario({dataEntity}) {


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validatiosSchema()),
        onSubmit: (usuario) => {
            
            console.log(usuario);
        }
    })

    const [lstNameLabels] = useState(['Nombres', 'Apellidos', 'Rol']);

    return (
        <>
            <FormCreateEdit
                nameEntity={'Usuario'} formik={formik}
                lstNameLabels={lstNameLabels} 
                dataEntity={dataEntity ? dataEntity : null}
                redirectBack={'/Admin/Usuarios'}
            />
        </>
    );

    function initialValues() {
        return {
            nombres: dataEntity ? dataEntity.Nombres : null,
            apellidos: dataEntity ? dataEntity.apellidos : null,
            rol: dataEntity ? dataEntity.rol : null,
        }
    }

    function validatiosSchema() {
        return {
            nombres: Yup.string().required('El nombre es requerido'),
            apellidos: Yup.string().required('El apellido es requerido'),
            rol: Yup.string().required('El rol es requerido'),
        }
    }
}
