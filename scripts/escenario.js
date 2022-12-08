'use strict'

//cuando cargue ostiene el estado del escenario de ajax
window.addEventListener('load', getEscenarioAjax(), false)
//let arrayEventos = JSON.parse(localStorage.eventos);


//Genera 210 contenedores de asiento con una imagen dentro 
let containerAsientos = document.querySelector('#container')
for (let i = 1; i < 211; i++) {
    
    let asiento = document.createElement('div');
    asiento.classList.add('asiento')
    asiento.setAttribute('id', i);

    let imagenAsiento = document.createElement('img')
    imagenAsiento.setAttribute('src', '../resources/chair.png');
    imagenAsiento.setAttribute('alt', 'Asiento')

    asiento.appendChild(imagenAsiento);
    containerAsientos.appendChild(asiento)
}



//TODO:Cambio a AJAX
//Esta variable la llena ajax
let arrayEventos;
//Obtener el id del evento de la url
let eventoId = location.href.split('id=')[1];

//Muestra el nombre del usuario en la web
let userId = JSON.parse(sessionStorage.user).usuario;
if (typeof userId !== 'undefined' || sessionStorage.user) {
    document.querySelector('#nombreUser').innerHTML = 'Bienvenido ' + userId;
    document.querySelector('#logout').addEventListener('click', () => {
        sessionStorage.clear()
        window.location = '../index.html'
    })
}


function cargaEvento(arrayEventos) {
    let evento = arrayEventos.find(a => a.id === eventoId)
    cargaDatosEvento(evento)
    cargaSituacionButacas(evento)
    vendeAsientos(evento);
}

//Escribe en la cabecera los datos del evento
function cargaDatosEvento(evento) {
    document.querySelector('#nombre').appendChild(document.createTextNode(evento.nombre))
    document.querySelector('#descripcion').appendChild(document.createTextNode(evento.descripcion))
    document.querySelector('#fecha').appendChild(document.createTextNode(new Date(evento.fecha).toLocaleDateString()))
    document.querySelector('#precio').appendChild(document.createTextNode(evento.precio))
    document.querySelector('#imagenEvento').src = evento.imagen
}
//Carga la situacion de butacas del evento
function cargaSituacionButacas(evento) {
    let asientos = document.querySelectorAll('.asiento')

    //Si tiene la propiedad ocupacion la modifico
    if ('ocupacion' in evento) {
        evento.ocupacion.forEach(asiento => {
            if (asiento.ocupado) {
                let ocupados = [...asientos].find(a => a.id === asiento.id)
                ocupados.classList.add('asientoOcupado');
            }
        })
    } else {
        //Si no creo una propiedad base que se añadirá al evento(un objeto que tiene id=el id del div y un boolenao que es false )
        let base = [...document.querySelectorAll('.asiento')].map(asiento => {
            return {
                id: asiento.id,
                ocupado: false
            }
        })
        //añado propiedad ocupacion basica al evento
        evento.ocupacion = base
        //Obtener la key del evento a modificar
        let keyEvento = arrayEventos.indexOf(arrayEventos.find(a => a.id === eventoId))
        //sobreescribo el evento
        arrayEventos[keyEvento] = evento
        //TODO:Cambio a AJAX
        //localStorage.setItem('eventos', JSON.stringify(arrayEventos));
        //Guardo en ajax
        setEscenario(arrayEventos);
    }
}
//Al hacer click sobre un asineto 
function vendeAsientos(evento) {
    let asientos = document.querySelectorAll('.asiento')
    asientos.forEach(asiento => {

        asiento.addEventListener('click', () => {

            //si no esta ocupado
            if (!asiento.classList.contains('asientoOcupado')) {
                alert('Has comprado el asiento: ' + asiento.id)
                //añade clase ocupado
                asiento.classList.add('asientoOcupado')
                //Según el estado del asiento 'ocupado' será true or false
                let ocupacion = [...document.querySelectorAll('.asiento')].map(asiento => {
                    return {
                        id: asiento.id,
                        ocupado: asiento.classList.contains('asientoOcupado')
                    }
                })
                //actualizo el objeto
                evento.ocupacion = ocupacion
                //obetener la posicion del objeto
                let keyEvento = arrayEventos.indexOf(arrayEventos.find(a => a.id === eventoId))
                //sobreescribir evento
                arrayEventos[keyEvento] = evento
                //TODO:Cambio a AJAX
                //Post del array
                setEscenario(arrayEventos)
                //localStorage.setItem('eventos', JSON.stringify(arrayEventos));
            } else {
                alert('El asiento: ' + asiento.id + ' está ocupado')
            }
        })
    })
}