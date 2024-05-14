import { useFormik } from "formik"
import * as Yup from 'yup'
import FormCreateEdit from "../../../components/FormCreateEdit/FormCreateEdit";
import { useState } from "react";

export default function CrearUsuario({dataEntity}) {

    // console.log(dataEntity);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validatiosSchema()),
        onSubmit: (formData) => {
            
            console.log(formData);
            const newUsuario = new FormData();
            newUsuario.append('nombre', formData.nombre);
            newUsuario.append('apellido', formData.apellido);
            newUsuario.append('email', formData.email);
            newUsuario.append('password', formData.password);
            newUsuario.append('rol', formData.rol);
            newUsuario.append('fileImagen', formData.fileImagen);
            newUsuario.append('filePortada', formData.filePortada);
            console.log(newUsuario.get('fileImagen'));
        }
    })

    const [lstNameLabels] = useState(['Nombre', 'Apellido', 'Email', 'Password', 'Rol']);

    const [lstInputsFileImage] = useState([['Foto Perfil', 'image/png, image/jpg, image/jpeg'], ['Foto Portada', 'image/png, image/jpg, image/jpeg']]);

    return (
        <>
            <FormCreateEdit
                nameEntity={'Usuario'} formik={formik}
                lstNameLabels={lstNameLabels} lstInputsFileImage={lstInputsFileImage}
                dataEntity={dataEntity ? dataEntity : null}
            />
        </>
    );

    function initialValues() {
        return {
            nombre: dataEntity ? dataEntity.nombre : null,
            apellido: dataEntity ? dataEntity.apellido : null,
            email: dataEntity ? dataEntity.email : null,
            password: dataEntity ? dataEntity.password : null,
            rol: dataEntity ? dataEntity.rol : null,
            fileImagen: dataEntity ? dataEntity.fileImagen : null,
            filePortada: dataEntity ? dataEntity.filePortada : null,
        }
    }

    function validatiosSchema() {
        return {
            nombre: Yup.string().required('El nombre es requerido'),
            apellido: Yup.string().required('El apellido es requerido'),
            email: Yup.string().email('El email no es valido').required('El email es requerido'),
            password: Yup.string().required('El password es requerido'),
            rol: Yup.string().required('El rol es requerido'),
            fileImagen: Yup.string().required('La imagen es requerida'),
            filePortada: Yup.string().required('La imagen de portada es requerida')
        }
    }
}
