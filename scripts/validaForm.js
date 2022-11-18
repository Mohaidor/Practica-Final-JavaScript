'use strict'
//TODO:Cambio a AJAX
//let eventosGuardados = JSON.parse(localStorage.getItem("eventos") || '[]');
let eventosGuardados;


let ajax2 = new XMLHttpRequest(); 
ajax2.open("GET", '../server/eventos.json', true);
ajax2.send();
//si si ha terminado de enviar y la respuesta es ok
ajax2.addEventListener("readystatechange", (e) => {
    if (ajax2.readyState == 4 && ajax2.status == 200) {
        eventosGuardados = JSON.parse(e.target.responseText)
        console.log('AJAX GET: obtener eventos. Resultado: Hay eventos');
    }
    if (ajax2.readyState == 4 && ajax2.status == 404) {
        eventosGuardados = []
        console.log('AJAX obetener eventos. Resultado: No hay eventos');
    }
}), false;

//guarda evento en ajax
function enviar(values) {

    let id = values['id-evento'];
    let nombre = values['nombre'];
    let fecha = new Date(values['fecha']);

    let descripcion = values['descripcion'];
    let precio = +values['precio'];
    let imagen = document.querySelector('#previewImagen').src;

    let evento = {
        id: id,
        nombre: nombre,
        fecha: fecha,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen
    }
    /*if (localStorage) {
        eventosGuardados.push(evento);
        localStorage.setItem("eventos", JSON.stringify(eventosGuardados))
    }*/
    //TODO:Cambio a AJAX
    guardaAjax(evento)

    alert('Evento añadido correctamente')
    resetForm();
}


function validar(name, value) {

    switch (name) {
        case 'id-evento':
            validaId(value);
            break;
        case 'nombre':
            validaNombre(value);
            break;
        case 'fecha':
            validaFecha(value);
            break;
        case 'descripcion':
            validaDescripcion(value);
            break;
        case 'precio':
            validaPrecio(value);
            break;
        case 'input-imagen':
            cargaImagen(value);
            break;
        default:
            break;
    }

}
///////////////////////////////////////////////////////////////Validación campo a campo//////////////////////////////////////////////////////////////////////////////
//Se explica el primero; Los demas son parecidos; Si hay algo diferente se explica


//Validar Id
let validaId = (id) => {

    //Obtener nodo del grupo id(label, input, error)
    let grupoId = document.querySelector('#grupo-id');
    //Obtener nodo del error
    let errorId = document.querySelector('#grupo-id .error');


    //Booleano que comprueba si esta vacio el input
    let vacio = id.length == 0
    //Booleano que usa ReGex para ver si son 1 o mas espacios
    let sonEspacios = (/^\s+$/g).test(id);
    //Booleano que usa ReGex para ver si cumple con los requisitos del ejercicio -> [1 Mayuscula][5 minusculas][4 numeros][1 simbolo de estos: +-*/]
    let cumpleRequisito = (/^[A-Z][a-z]{5}[0-9]{4}[\+|\-|\*|\/]$/gi).test(id);
    //Recorre el array de eventos en busca de si el id está repetido
    let idRepetido = eventosGuardados.find(evento => evento.id === id)


    if (vacio) {
        grupoId.classList.add('input-invalido');
        grupoId.classList.remove('input-valido');

        errorId.innerHTML = 'El id no puede quedar vacío'
    } else if (sonEspacios) {

        grupoId.classList.add('input-invalido');
        grupoId.classList.remove('input-valido');

        errorId.innerHTML = 'El id no puede quedar vacío'

    } else if (!cumpleRequisito) {

        grupoId.classList.add('input-invalido');
        grupoId.classList.remove('input-valido');

        errorId.innerHTML = 'El id no cumple el formato:<br>1 Mayuscula->5 Minusculas->4 números->1 carácter espacial(+-*/)<br>Ejemplo: Concer2563+ '
    } else if (idRepetido) {

        grupoId.classList.add('input-invalido');
        grupoId.classList.remove('input-valido');

        errorId.innerHTML = 'El id está repetido'
    } else {

        grupoId.classList.add('input-valido');
        grupoId.classList.remove('input-invalido');
    }

}
let validaNombre = (nombre) => {

    let grupoNombre = document.querySelector('#grupo-nombre');
    let errorNombre = document.querySelector('#grupo-nombre .error');
    let sonEspacios = (/^\s+$/g).test(nombre);
    let vacio = nombre.length == 0
    let corto = nombre.length < 2;

    if (vacio) {

        grupoNombre.classList.add('input-invalido');
        grupoNombre.classList.remove('input-valido');

        errorNombre.innerHTML = 'El Nombre no puede quedar vacío'

    } else if (sonEspacios) {

        grupoNombre.classList.add('input-invalido');
        grupoNombre.classList.remove('input-valido');

        errorNombre.innerHTML = 'El nombre no puede quedar vacío'

    } else if (corto) {

        grupoNombre.classList.add('input-invalido');
        grupoNombre.classList.remove('input-valido');

        errorNombre.innerHTML = 'El nombre tiene que ser mayor a 1 carácter';

    } else {
        grupoNombre.classList.add('input-valido');
        grupoNombre.classList.remove('input-invalido');

    }
}
let validaFecha = (fecha) => {

    let fechaHoy = new Date()
    let fechaYMD = fechaHoy.toISOString().split('T')[0]

    let grupoFecha = document.querySelector('#grupo-fecha');
    let errorFecha = document.querySelector('#grupo-fecha .error');
    let vacio = fecha.length == 0
    let fechaMenor = fecha < fechaYMD


    if (vacio) {

        grupoFecha.classList.add('input-invalido');
        grupoFecha.classList.remove('input-valido');

        errorFecha.innerHTML = 'La fecha no puede quedar vacía'

    } else if (fechaMenor) {
        grupoFecha.classList.add('input-invalido');
        grupoFecha.classList.remove('input-valido');

        errorFecha.innerHTML = `La fecha no puede ser menor a hoy: ${fechaHoy.toLocaleDateString()}`
    } else {
        grupoFecha.classList.add('input-valido');
        grupoFecha.classList.remove('input-invalido');
    }



}

let validaDescripcion = (descripcion) => {
    let grupoDescripcion = document.querySelector('#grupo-descipcion');
    let errorDescripcion = document.querySelector('#grupo-descipcion .error');
    let sonEspacios = (/^\s+$/g).test(nombre);
    let vacio = descripcion.length == 0
    let corto = descripcion.length < 10;

    if (vacio) {
        grupoDescripcion.classList.add('input-invalido');
        grupoDescripcion.classList.remove('input-valido');

        errorDescripcion.innerHTML = 'La descripción no puede quedar vacía'
    } else if (sonEspacios) {
        //Si son solo espacios pongo al grupo estilos de invalido y quito los de valido si estubieran
        grupoDescripcion.classList.add('input-invalido');
        grupoDescripcion.classList.remove('input-valido');
        //Establezco el mensaje de error
        errorNombre.innerHTML = 'La descripción no puede quedar vacía'

    } else if (corto) {
        //Si son solo espacios pongo al grupo estilos de invalido y quito los de valido si estubieran
        grupoDescripcion.classList.add('input-invalido');
        grupoDescripcion.classList.remove('input-valido');
        //Establezco el mensaje de error

        errorDescripcion.innerHTML = 'La descripción tiene que ser mayor a 10 carácter';

    } else {
        grupoDescripcion.classList.add('input-valido');
        grupoDescripcion.classList.remove('input-invalido');

    }
}
let validaPrecio = (precio) => {


    let grupoPrecio = document.querySelector('#grupo-precio');
    let grupoPrecioInput = document.querySelector('#grupo-precio input');
    let errorPrecio = document.querySelector('#grupo-precio .error');
    let vacio = precio.length == 0
    let sonEspacios = (/^\s+$/g).test(precio);
    let dosDecimales = (/^\d*\.?\d{0,2}$/).test(precio)
    let cumpleRequisito = (/^\d*\.?\d*?$/).test(precio)



    if (vacio) {
        grupoPrecio.classList.add('input-invalido');
        grupoPrecio.classList.remove('input-valido');

        errorPrecio.innerHTML = 'El precio no puede quedar vacío'
    } else if (sonEspacios) {
        grupoPrecio.classList.add('input-invalido');
        grupoPrecio.classList.remove('input-valido');

        errorPrecio.innerHTML = 'El precio no puede quedar vacío'
    } else if (!cumpleRequisito) {
        //Si son solo espacios pongo al grupo estilos de invalido y quito los de valido si estubieran
        grupoPrecio.classList.add('input-invalido');
        grupoPrecio.classList.remove('input-valido');
        //Establezco el mensaje de error
        errorPrecio.innerHTML = 'El precio debe ser un valor numérico'
    } else if (!dosDecimales) {
        grupoPrecioInput.value = Number.parseFloat(precio).toFixed(2);
    } else {
        grupoPrecio.classList.add('input-valido');
        grupoPrecio.classList.remove('input-invalido');

    }


}


function cargaImagen() {


    let grupoImagen = document.querySelector('#grupo-imagen');
    let errorImagen = document.querySelector('#grupo-imagen .error');

    let previewImagen = document.querySelector('#previewImagen');
    let captionImagen = document.querySelector('#captionImagen');

    let imagen = inputImagen.files[0];


    if (typeof imagen == 'undefined') {
        grupoImagen.classList.add('input-invalido');
        grupoImagen.classList.remove('input-valido');
        previewImagen.src = "";
        captionImagen.innerHTML = "";
    } else if (!imagen.type.startsWith('image')) {
        grupoImagen.classList.add('input-invalido');
        grupoImagen.classList.remove('input-valido');
        previewImagen.src = "";
        captionImagen.innerHTML = "";
        errorImagen.innerHTML = `Error: El archivo seleccionado : ${imagen.name} es de tipo: ${imagen.type}`;
    } else {

        grupoImagen.classList.remove('input-invalido');
        grupoImagen.classList.add('input-valido');
    }

}

function resetForm() {
    document.querySelectorAll('.form-group').forEach(group => { group.classList.remove('input-valido') });
    document.querySelectorAll('.form-control').forEach(input => input.value = "");
    document.querySelector('#previewImagen').src = "";
    document.querySelector('#captionImagen').innerHTML = "";

}