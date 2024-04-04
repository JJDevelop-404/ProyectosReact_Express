import { Link, useNavigate } from 'react-router-dom';
import './FormCrearEditar.css';
import Swal from 'sweetalert2';

export default function FormCrearEditar({ formik, nombreEntidad, dataEntidad, lstNombresLabels, lstNombresSelects,
    lstSelectOptions, redireccionBtnRegresar }) {

    // Explicacion variables que se reciben:
    /* 
        formik: esta debe contener la logica de [subida y validación] del formulario -> es un useFormik
        nombreEntidad: esta debe contener el nombre de la entidad a crear o editar -> es un string
        dataEntidad: esta es por si llega alguna entidad, si llega, eso quiere decir que se editará sino, se creará -> es un objeto
        lstNombresLabels: esta contiene todos los nombres de los label -> es una lista
        lstNombresSelect: esta contiene todos los nombres de los select -> es una lista
        lstSelectOptions: esta contiene todas las opciones que va a tener mi select -> es una matriz
        redireccionBtnRegresar: esta contiene la ruta de redireccion -> es un string
    */
    const lstPropiedadesEntidad = Object.keys(formik.values);
    const lstPropiedadesSelect = lstPropiedadesEntidad.filter(prop => prop.includes('cbx'));

    //Explicacion variables locales:
    /* 
        lstPropiedadesEntidad: esta obtiene las keys de nuestros valores del formik. Estas son usadas para acceder a ellas ya
        sea para el manejo de errores o para darle el valor al input o select dependiendo si llega una dataEntidad (si llega dataEntidad es pq se va a editar)
        lstPropiedadesSelect: esta obtiene las keys de nuestros valores del formik. IMPORTANTE, en el initialValues del formik que nos llega el/los select 
        deben tener el cbxNombrePropiedad para que esta lista los pueda obtener, ya que el busca eso, que incluya el cbx
    */

    let lstPropiedadesOptions = [];
    lstSelectOptions ? lstPropiedadesOptions = Object.keys(lstSelectOptions[1]) : null;
    // console.log(dataEntidad);
    // console.log(lstSelectOptions);
    // console.log(dataEntidad[lstPropiedadesSelect]);



    return (
        <>
            <div className="container-formCrear">
                <form className='formCrear empleado-form' onSubmit={formik.handleSubmit}>

                    <h2 className='Linealh2'> {dataEntidad ? 'Modificar ' : 'Crear '} {nombreEntidad} </h2>
                    {lstNombresLabels && lstNombresLabels.map((label, index) => (
                        <div key={index} className="form-group mb-2">

                            <label htmlFor={label} className="form-label" > {label} </label>

                            <input name={lstPropiedadesEntidad[index]} id={label} className="form-control"
                                defaultValue={dataEntidad ? dataEntidad[lstPropiedadesEntidad[index]] : null}
                                onFocus={formik.handleBlur} /* Esto es para que el formik.touched sea true apenas clickemos el campo y de una nos salga el mensaje de error */
                                onChange={formik.handleChange} />

                            {formik.touched[lstPropiedadesEntidad[index]] && formik.errors[lstPropiedadesEntidad[index]] ? (
                                <span className='msj-error'>{formik.errors[lstPropiedadesEntidad[index]]}</span>
                            ) : null}

                        </div>
                    ))}

                    {lstNombresSelects && lstNombresSelects.map((select, pos_select) => (
                        <div key={pos_select} className="form-group mb-2">

                            <label htmlFor={select} className="form-label"> {select} </label>

                            <select name={lstPropiedadesSelect[pos_select]} id={select} className='form-select'
                                defaultValue={dataEntidad ? dataEntidad[lstPropiedadesSelect[pos_select]] : null}
                                onFocus={formik.handleBur}
                                onChange={formik.handleChange}>

                                {lstSelectOptions && lstSelectOptions.map((option, pos_option) => (
                                    <option key={pos_option} value={option[lstPropiedadesOptions[0]]} > {option[lstPropiedadesOptions[0]]} </option>
                                ))}

                            </select>

                            {formik.touched[lstPropiedadesSelect[pos_select]] && formik.errors[lstPropiedadesSelect[pos_select]] ? (
                                <span className="msj-error"> {formik.errors[lstPropiedadesSelect[pos_select]]} </span>
                            ) : null}

                        </div>
                    ))}

                    <div className="container-btn-form-crear">
                        <button type="submit" className='btn btn-success'> {dataEntidad ? 'Editar' : 'Crear'} {nombreEntidad} </button>
                        <Link to={redireccionBtnRegresar} className='btn btn-secondary m-3'> Regresar </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export const alertaCrearEditar = (mensaje, icon = 'success', navigate) => {

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: mensaje,
    })

    if (navigate) {
        setTimeout(() => {
            navigate();
        }, 500)
    }

}