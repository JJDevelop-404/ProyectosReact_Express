import { Link, json, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Tabla.css';

export default function Tabla({ lstTitulosTabla, NombreEntidad, RedireccionBotonCrear, lstDataEntidad,
    RedireccionBtnEditar, FuncionBtnEliminar }) {

    // console.log(lstDataEntidad);
    const navigate = useNavigate();

    const onHandleClickEliminar = (data) => {
        let propiedades = obtenerTodasPropiedadesYAcomodarInformacion(data);
        Swal.fire({
            title: '¿Eliminar este registro?',
            html: `${propiedades.all}<br><b>NO PODRÁS REVERTIR ESTO</b>`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusCancel: true,
            confirmButtonColor: '#DC3545',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            result.isConfirmed ? FuncionBtnEliminar(data[propiedades.id]) : console.log('No se eliminará');
        })
    }

    const onHandleClickEditar = (data) => {
        let propiedades = obtenerTodasPropiedadesYAcomodarInformacion(data);
        // console.log(propiedades);
        Swal.fire({
            title: '¿Deseas editarlo?',
            html: `${propiedades.all}`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonColor: '#007BFF',
            confirmButtonText: 'Si'
        }).then((result) => {
            // console.log(data[propiedades.id]);
            const id_Data = data[propiedades.id];
            result.isConfirmed ? navigate(`${RedireccionBtnEditar}/${id_Data}`, { state: data }) : console.log('No se editará');
        })
    };

    return (
        <section className='container-table-component'>
            <h2 className='titulo-tabla'> Listado de {NombreEntidad} </h2>
            <div className='container-btn-tbl-crear'>
                <Link className='btn-tbl-crear btn btn-success' to={RedireccionBotonCrear}> Crear {NombreEntidad} </Link>
            </div>
            <div className="container-tabla table-responsive">
                <table className="table table-sm table-dark table-bordered">
                    <thead className='head-tbl'>
                        <tr>
                            {lstTitulosTabla && lstTitulosTabla.map((titulo) => (
                                <th key={titulo}> {titulo} </th>
                            ))}
                            <th> Acciones </th>
                        </tr>
                    </thead>
                    <tbody className='body-tbl align-middle'>
                        {lstDataEntidad && lstDataEntidad.map((data, index) => (
                            <tr key={index}>
                                {Object.keys(data).map((propiedad) => (
                                    <td key={propiedad}> {data[propiedad]} </td>
                                ))}
                                <td className='container-btn-acciones'>
                                    <button className='btn btn-primary' onClick={() => onHandleClickEditar(data)}>
                                        Editar
                                    </button>
                                    <button className='btn btn-danger' onClick={()=>onHandleClickEliminar(data)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
    
    function obtenerTodasPropiedadesYAcomodarInformacion(data){
        let propiedades = Object.keys(data);
        const propiedadId = propiedades[0];
        let propiedades_atributos = '';
        let index = 0;
        for(let i of propiedades){
            propiedades_atributos += `<b>${lstTitulosTabla[index]}:</b> ${data[i]} <br>`;
            index++;
        }
        return {
            all: propiedades_atributos,
            id: propiedadId 
        };
    }

}
export function alertEliminar(mensaje, icon, actualizacionData){
    Swal.fire({
        title: mensaje,
        icon: icon,
        didClose: actualizacionData
    });
}
export function alertError(titulo, mensaje){
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'error'
    });
}
