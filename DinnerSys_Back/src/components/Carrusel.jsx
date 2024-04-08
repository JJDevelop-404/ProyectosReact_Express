import { useRef, useState } from "react";
import './Carrusel.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { LiberarMesa } from "../API/Mesas";

export default function Carrusel({ Mesas, setMesas }) {

    // Me tocó pasarle las Mesas y su función para actualizarlas, porque no me dejaba actualizarlas desde aquí

    const navigate = useNavigate();
    const carruselOcupadasRef = useRef(null); //Para el scroll del carrusel mesas ocupadas
    const carruselLibresRef = useRef(null); //Para el scroll del carrusel mesas libres

    const { UserId: MsroId } = useAuth();

    //Para saber cual mesa se seleccionó y que solo se pueda seleccionar una mesa
    const [MesaATomarPedido, setMesaATomarPedido] = useState(null);

    //Esta funcion hace de seleccionar o deseleccionar la mesa
    const MesaCheckeada = (id) => {
        if (MesaATomarPedido === id) {
            setMesaATomarPedido(null);
            // Esto es para deseleccionar la mesa
        } else {
            // Esto es para seleccionar la mesa
            setMesaATomarPedido(id);
        }
    };

    // Para actualizar (CantidadClientes===0) la mesa que estaba ocupada y que fue seleccionada 

    const OnHandleClickLiberar = async (Mesa) => {
        /* Pasos para liberar la mesa:
        1. Preguntar si si está libre la mesa antes de liberarla
        2. Actualizar la mesa que fue seleccionada y ponerle que su estado ahora es libre
        */
        LiberarMesa(Mesa.MesaId)
            .then((response) => {
                console.log("Mesa Liberada", response);
                setMesas(Mesas.map(m => (m.MesaId === Mesa.MesaId ? { ...m, Estado: 0 } : m)));
            });

    };

    function OnOrdenar(Mesa) {
        navigate(`/Mesero/${MsroId}/Pedidos`, { state: { MesaId: Mesa.MesaId } });
    };

    return (
        <>
            <div className="container-carrusel-component">
                <section className="carrusel" ref={carruselOcupadasRef}>
                    <div className="mesas-title">
                        <h3>Mesas Ocupadas </h3>
                    </div>
                    {Mesas && Mesas.filter(me => me.Estado === 1).map(mesa => (
                        <div key={mesa.MesaId}>
                            <input type="checkbox" id={`checkbox${mesa.MesaId}`} name="mesasSelect" checked={mesa.Estado === 1} readOnly />
                            <label htmlFor={`checkbox${mesa.id}`} className='circulo-container'> <span className='icon-mesas'> </span> <p> {mesa.MesaId} </p> </label>
                            <div className="carrusel-container-btn">
                                <button className="btnCarrusel" onClick={() => OnHandleClickLiberar(mesa)}  > Liberar </button>
                            </div>
                        </div>

                    ))}
                    <div className="container-dz">
                        <button className="desplazar" onClick={()=>scrollRight(carruselOcupadasRef)}> {'>'} </button>
                        <button className="desplazarLeft" onClick={()=>scrollLeft(carruselOcupadasRef)}> {'<'} </button>
                    </div>
                </section >

                <section className="carrusel" ref={carruselLibresRef} >
                    <div className="mesas-title">
                        <h3>Mesas Libres </h3>
                    </div>
                    {Mesas && Mesas.filter(me => me.Estado === 0).map(mesa => (
                        <div key={mesa.MesaId}>
                            <input type="checkbox" id={`checkbox${mesa.MesaId}`} checked={MesaATomarPedido === mesa.MesaId} onChange={() => { MesaCheckeada(mesa.MesaId) }} />
                            <label htmlFor={`checkbox${mesa.MesaId}`} className='circulo-container'> <span className='icon-mesas'> </span> <p> {mesa.MesaId} </p> </label>
                            {MesaATomarPedido === mesa.MesaId &&
                                <div className="carrusel-container-btn">
                                    <button id={`checkbox${mesa.MesaId}`} type='button' className="btnCarrusel" onClick={() => OnOrdenar(mesa)}> Ordenar </button>
                                </div>
                            }
                        </div>
                    ))}
                    <div className="container-dz">
                        <button className="desplazar" onClick={()=>scrollRight(carruselLibresRef)}> {'>'} </button>
                        <button className="desplazarLeft" onClick={()=>scrollLeft(carruselLibresRef)} > {'<'} </button>
                    </div>
                </section>
            </div>
        </>
    )

    function scrollRight(carruselRef) {
        carruselRef.current.scrollLeft += 200;
    }

    function scrollLeft(carruselRef){
        carruselRef.current.scrollLeft -= 200;
    }
}