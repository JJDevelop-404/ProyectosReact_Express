import Swal from "sweetalert2";
import '../index.css'

export function alertaToast({ titulo, position = 'top-end', icon = 'success', tiempoMs = 2000, funcion }) {
    Swal.fire({
        position: position,
        title: titulo,
        icon: icon,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: tiempoMs,
        toast: true
    }).then(() => {
        funcion ? funcion() : null;
    });
}

export function alertaToastFuncionAsync({ position = 'top-end', titulo, funcionAsync }) {
    //esta funcion es para manejar mejor los errores desde afuera y no desde aqui mismo
    Swal.fire({
        position: position,
        title: titulo,
        showConfirmButton: false,
        timerProgressBar: true,
        toast: true,
        didOpen: () => {
            Swal.showLoading();
            funcionAsync();
        }
    })
}

export function alertaCargandoProceso({ titulo, messageHtml, funcionAsync, segundaFuncion = null }) {
    Swal.fire({
        title: titulo,
        html: messageHtml,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            // Inicia la operación del servidor
            funcionAsync(); //El then y catch se maneja en la funcion que llama a esta funcion
        }
    });
}

//Alerta para errores en la respuesta del servidor
export function alertaFallaServidor({ status, mensaje, icon = 'error' }) {
    Swal.fire({
        width: '28em',
        backdrop: 'rgb(219, 53, 69, .4)',
        title: status,
        text: mensaje,
        icon: icon,
        confirmButtonText: 'Aceptar',
    });
}