import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import './TablaListar.css';

export default function TablaListar({ lstTitlesTable, nameEntity, lstDataEntity, redirectionBtnCreate, redirectionBtnEdit, functionBtnDelete, showAcciones = true }) {

    const navigate = useNavigate();

    const onHandleClickDelete = (data) => {
        let props = getAllPropsAndOrginazeInformation(data);
        Swal.fire({
            title: '¿Eliminar este registro?',
            html: `${props.all}<br><b>NO PODRÁS REVERTIR ESTO</b>`,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            focusCancel: true,
            confirmButtonColor: '#DC3545',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            result.isConfirmed ? functionBtnDelete(data[props.id]) : console.log('No se eliminará');
        })
    }

    const onHandleClickEdit = (data) => {
        let props = getAllPropsAndOrginazeInformation(data);
        // console.log(props);
        Swal.fire({
            title: '¿Deseas editarlo?',
            html: `${props.all}`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: 'No',
            confirmButtonColor: '#007BFF',
            confirmButtonText: 'Si'
        }).then((result) => {
            // console.log(data[props.id]);
            const id_Data = data[props.id];
            result.isConfirmed ? navigate(`${redirectionBtnEdit}/${id_Data}`, { state: data }) : console.log('No se editará');
        })
    };

    return (
        <div className='component-tabla-listar'>
            <h2 className='title-table-list text-center'> Listado de {nameEntity} </h2>
            <div className='container-btn-tabla-crear'>
                <Link to={redirectionBtnCreate} className='btn-tabla-crear btn btn-success'> Agregar {nameEntity} </Link>
            </div>
            <div className="container-tabla-listar table-responsive">
                <table className='tabla-listar table table-dark table-striped table-hover table-bordered'>
                    <thead>
                        <tr>
                            {lstTitlesTable.length > 0 && lstTitlesTable.map((titulo, index) => (
                                <th key={index}> {titulo} </th>
                            ))}
                            {showAcciones && <th> Acciones </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {lstDataEntity.length > 0 && lstDataEntity.map((data, index) => (
                            <tr key={index} className='align-middle'>
                                {Object.keys(data).map((propiedad, j_index) => (
                                    <td key={j_index}>
                                        {!propiedad.toLowerCase().includes('image') ? data[propiedad] : <img className='img-into-table' src={data[propiedad]} />}
                                    </td>
                                ))}

                                {showAcciones && <td className='container-btn-acciones-tbl align-middle'>
                                    <button className='btn-tbl-listar-editar btn btn-primary' onClick={() => onHandleClickEdit(data)}> Editar </button>
                                    <button className='btn-tbl-listar-eliminar btn btn-danger' onClick={() => onHandleClickDelete(data)}> Eliminar </button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    function getAllPropsAndOrginazeInformation(data){
        let props = Object.keys(data);
        const propId = props[0];
        let props_attributes = '';
        let index = 0;
        for(let i of props){
            props_attributes += `<b>${lstTitlesTable[index]}:</b> ${i.toLowerCase().includes('image') ? `<img style='width:80px;' src=${data[i]}  />` : '&nbsp;'+data[i] } <br> `;
            index++;
        }
        return {
            all: props_attributes,
            id: propId 
        };
    }
}
