'use strict'

//Al cargar la página llama a la función cargaEventos
window.addEventListener('load', () => {
    getEventos()
}, false);

let eventosGuardados;

//El nodo del selector del orden de los eventos
let select = document.querySelector('#orden');
//Cuando se cambie el valor del orden se llama a la función de cargar eventos
select.addEventListener('change', () => {
    cargaEventos(eventosGuardados);
})

//Muestra el nombre del usuario en la web
let userId = location.href.split('user=')[1] || JSON.parse(sessionStorage.user).usuario;
if (typeof userId !== 'undefined' || sessionStorage.user) {
    document.querySelector('#nombreUser').innerHTML = 'Bienvenido ' + userId;
    document.querySelector('#logout').addEventListener('click', () => {
        sessionStorage.clear()
        window.location = '../index.html'
    })

}


function cargaEventos(eventosGuardados) {
    //TODO:Cambio a AJAX

    //filtra solo los eventos de hoy en adelante
    eventosGuardados = filtraEventosActuales(eventosGuardados)
    //Retorna el eventosGuardados ordenado según la elección del select
    eventosGuardados = ordenaEventos(eventosGuardados);
    //Recorre los eventos y añade al DOM las cartas de los eventos
    generaEventos(eventosGuardados)


    /*if (localStorage.eventos && localStorage != '[]') {
        //Obtener json y parsear a array de objetos eventos
        let arrayEventos = JSON.parse(localStorage.eventos);
        //filtra eventos de hoy en adelante
        arrayEventos = filtraEventosActuales(arrayEventos)
        //Retorna el arrayEventos ordenado según la elección del select
        arrayEventos = ordenaEventos(arrayEventos);
        //Recorre los eventos y añade al DOM las cartas de los eventos
        generaEventos(arrayEventos)

    } else {

        let div = document.createElement('div')
        div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos. Puedes crear uno ')));
        let link = document.createElement('a')
        link.setAttribute('href', '../html/nuevo-evento.html')
        link.innerHTML = 'AQUI';
        div.appendChild(link)

        document.querySelector('#contenedor-eventos').appendChild(div)
    }*/
}


function filtraEventosActuales(arrayEventos) {
    let filtrados = arrayEventos.filter(evento => {

        //Retorna la fecha de hoy en formato yyyy-mm-dd
        let fechaHoy = new Date().toISOString().split('T')[0]
        //Si la fecha del evento es menor a la del dia de hoy -> retorna el evento que será guardado en el array eventos
        if (evento.fecha >= fechaHoy) {
            return evento
        }
    })

    return filtrados;
}
//ordena los eventos
function ordenaEventos(arrayEventos) {

    //Ordena el array en función de lo seleccionado en el select del orden
    if (select.value == 'nombreASC') {
        //elimina todos los eventos(obtiene el contenedor padre y al escribir '' borra todos los eventos que había)
        document.querySelector('#contenedor-eventos').innerHTML = "";

        arrayEventos.sort((evento1, evento2) => {
            //pongo en minusculas los dos nombres a comparar
            let e1 = evento1.nombre.toLowerCase();
            let e2 = evento2.nombre.toLowerCase();
            //ordena ascendente
            if (e1 < e2) {
                return -1;
            }
            if (e1 > e2) {
                return 1;
            }
            return 0;
        })
        return arrayEventos;
    } else if (select.value == 'descripcionASC') {
        document.querySelector('#contenedor-eventos').innerHTML = "";
        arrayEventos.sort((evento1, evento2) => {
            let e1 = evento1.descripcion.toLowerCase();
            let e2 = evento2.descripcion.toLowerCase();
            if (e1 < e2) {
                return -1;
            }
            if (e1 > e2) {
                return 1;
            }
            return 0;
        })
        return arrayEventos;
    } else if (select.value == 'fechaASC') {

        document.querySelector('#contenedor-eventos').innerHTML = "";
        arrayEventos.sort((evento1, evento2) => {
            let e1 = new Date(evento1.fecha)
            let e2 = new Date(evento2.fecha)

            return e1 - e2
        });
        return arrayEventos;
    } else if (select.value == 'precioASC') {

        document.querySelector('#contenedor-eventos').innerHTML = "";
        arrayEventos.sort((evento1, evento2) => {
            return evento1.precio - evento2.precio;
        });
        return arrayEventos;
    } else if ('precioDESC') {
        document.querySelector('#contenedor-eventos').innerHTML = "";
        arrayEventos.sort((evento1, evento2) => {
            return evento2.precio - evento1.precio;
        });
        return arrayEventos;
    }
}
//genera las cartas de eventos
function generaEventos(arrayEventos) {

    //Contenedor de todas las cartas
    let contenedor = document.querySelector('#contenedor-eventos');



    //Relleno los elementos con los valores del array
    arrayEventos.forEach(evento => {

        //Creo elementos de cada carta 
        let cartaEvento = document.createElement('article');
        cartaEvento.setAttribute('id', evento.id)

        //Imagen
        let contenedorImagen = document.createElement('figure');
        let imagen = document.createElement('img');
        imagen.setAttribute('alt', 'Imagen Evento');
        imagen.setAttribute('src', evento.imagen);
        contenedorImagen.appendChild(imagen);

        //Nombre y descripción(Si es demasido largo se recorta)
        let contenedorSection = document.createElement('section');
        let nombre = document.createElement('h2');
        nombre.appendChild(document.createTextNode(evento.nombre.length > 50 ? evento.nombre.slice(0, 50) + '...' : evento.nombre))
        let descripcion = document.createElement('p')
        descripcion.appendChild(document.createTextNode(evento.descripcion.length > 50 ? evento.descripcion.slice(0, 50) + '...' : evento.descripcion))
        contenedorSection.appendChild(nombre);
        contenedorSection.appendChild(descripcion);

        //Fecha y precio
        let footer = document.createElement('footer');
        let fecha = document.createElement('p');
        fecha.appendChild(document.createTextNode(new Date(evento.fecha).toLocaleDateString()))
        let precio = document.createElement('p');
        precio.appendChild(document.createTextNode(evento.precio + '€'))
        footer.appendChild(fecha);
        footer.appendChild(precio);

        //Botones
        let contenedorBotones = document.createElement('div');
        let botonBorrar = document.createElement('input')
        botonBorrar.setAttribute('type', 'button')
        botonBorrar.setAttribute('value', 'Borrar')
        botonBorrar.addEventListener('click', () => {
            borraEvento(arrayEventos, evento.id, cartaEvento)
        });
        let botonReserva = document.createElement('input')
        botonReserva.setAttribute('type', 'button')
        botonReserva.setAttribute('value', 'Comprar')
        botonReserva.addEventListener('click', () => {
            location.href = `./escenario.html?id=${evento.id}`
        });
        contenedorBotones.appendChild(botonBorrar)
        contenedorBotones.appendChild(botonReserva)

        //Añado todos los elementos a la carta
        cartaEvento.appendChild(contenedorImagen);
        cartaEvento.appendChild(contenedorSection);
        cartaEvento.appendChild(footer);
        cartaEvento.appendChild(contenedorBotones)
        //Añado la carta al contenedor
        contenedor.appendChild(cartaEvento);
    });
}
//Borra un evento
function borraEvento(arrayEventos, id, evento) {

    //pide condirmación
    if (confirm('¿Estas seguro de borrar este Evento?')) {

        //obtener la key en el array mediante el id
        let keyEvento = arrayEventos.indexOf(arrayEventos.find(evento => evento.id === id))
        //Elimino del array en la posicion de la key 1 elemento
        arrayEventos.splice(keyEvento, 1);
        console.log(arrayEventos);
        //TODO:Cambio a AJAX
        actulizaEventosAjax(arrayEventos);
        /*if (localStorage) {
            //actualizo el valor del json del localstorage 
            localStorage.setItem("eventos", JSON.stringify(arrayEventos))
        }*/
        //mediante el contenedor de la carta se autoelimina
        evento.remove()
    }
}