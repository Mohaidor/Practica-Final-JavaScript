'use strict'

let ajax;

//Hace un GET-> si no encuentrael eventos.json hace un POST y lo crea asi: [eventos]; 
//Si se le vuelve a llamar hace GET y como existe push de 1 eventos al array y guarda 

function guardaAjax(evento) {
    ajax = new XMLHttpRequest();
    ajax.open("GET", '../server/eventos.json', true);
    ajax.send();
    //si si ha terminado de enviar y la respuesta es ok
    ajax.addEventListener("readystatechange", (e) => {

        //Si existe el eventos json..
        if (ajax.readyState == 4 && ajax.status == 200) {

            let arrayeventos = JSON.parse(e.target.responseText);

            arrayeventos.push(evento);

            let eventosActualizado = JSON.stringify(arrayeventos);
            ajax = new XMLHttpRequest();
            //
            ajax.open("POST", "../server/post.php", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(eventosActualizado);

            //cuando lo envie
            ajax.addEventListener('readystatechange', () => {
                //si si ha terminado de enviar y recibir y la respuesta es ok
                if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log('AJAX POST: push de evento a array y guardar');
                } else if (ajax.status != 200) {
                    alert('Se ha producido un error al guardar')
                }
            }, false)

        }
        //Si NO existe eventos.json lo crea con array vacío
        if (ajax.readyState == 4 && ajax.status == 404) {

            let baseArray = JSON.stringify([evento]);
            ajax = new XMLHttpRequest();
            //
            ajax.open("POST", "../server/post.php", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(baseArray);

            //cuando lo envie
            ajax.addEventListener('readystatechange', () => {
                //si si ha terminado de enviar y recibir y la respuesta es ok
                if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log('AJAX POST: array con 1 evento');
                } else if (ajax.status != 200) {
                    alert('Se ha producido un error al guardar')
                }
            }, false)
        }
    }), false;

}

//Actualiza los eventos tras borrar uno de ellos

function actulizaEventosAjax(arrayEventos) {

    ajax = new XMLHttpRequest();
    ajax.open("POST", "../server/post.php", true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(JSON.stringify(arrayEventos));

    //cuando lo envie
    ajax.addEventListener('readystatechange', () => {
        //si si ha terminado de enviar y recibir y la respuesta es ok
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log('AJAX POST: Actuliza sin el borrado');
        } else if (ajax.status != 200) {
            alert('Se ha producido un error al guardar')
        }
    }, false)
}

//Obtiene todos los eventos para la página eventos

function getEventos() {

    let ajax2 = new XMLHttpRequest();
    ajax2.open("GET", '../server/eventos.json', true);
    ajax2.send();
    //si si ha terminado de enviar y la respuesta es ok
    ajax2.addEventListener("readystatechange", (e) => {
        if (ajax2.readyState == 4 && ajax2.status == 200) {
            console.log('AJAX GET: obetener eventos y mostrar');
            eventosGuardados = JSON.parse(e.target.responseText)

            eventosGuardados = filtraEventosActuales(eventosGuardados);

            if (eventosGuardados.length) {
                cargaEventos(eventosGuardados);
            } else {
                console.log('AJAX GET:No hay eventos->muestra mensaje');

                let div = document.createElement('div')
                div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos pasados')));
                div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos. Puedes crear uno ')));
                let link = document.createElement('a')
                link.setAttribute('href', '../html/nuevo-evento.html')
                link.innerHTML = 'AQUI';
                div.appendChild(link)

                document.querySelector('#contenedor-eventos').appendChild(div)
            }
        }
        if (ajax2.readyState == 4 && ajax2.status == 404) {
            console.log('AJAX GET:No hay eventos->muestra mensaje');

            let div = document.createElement('div')
            div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos. Puedes crear uno ')));
            let link = document.createElement('a')
            link.setAttribute('href', '../html/nuevo-evento.html')
            link.innerHTML = 'AQUI';
            div.appendChild(link)

            document.querySelector('#contenedor-eventos').appendChild(div)
        }
    }), false;
}


//Obtiene todos los eventos para la página eventos-pasados

function getEventosPasados() {
    let ajax2 = new XMLHttpRequest();
    ajax2.open("GET", '../server/eventos.json', true);
    ajax2.send();
    //si si ha terminado de enviar y la respuesta es ok
    ajax2.addEventListener("readystatechange", (e) => {
        if (ajax2.readyState == 4 && ajax2.status == 200) {
            console.log('AJAX GET: obetener eventos y mostrar');
            eventosGuardados = JSON.parse(e.target.responseText)

            eventosGuardados = filtraEventosPasados(eventosGuardados);

            if (eventosGuardados.length) {
                cargaEventos(eventosGuardados);
            } else {
                console.log('AJAX GET:Hay eventos pero NO PASADOS->muestra mensaje');

                let div = document.createElement('div')
                div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos pasados')));

                document.querySelector('#contenedor-eventos').appendChild(div)
            }
        }
        if (ajax2.readyState == 4 && ajax2.status == 404) {
            console.log('AJAX GET:No hay eventos->muestra mensaje');

            let div = document.createElement('div')
            div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos. Puedes crear uno ')));
            let link = document.createElement('a')
            link.setAttribute('href', '../html/nuevo-evento.html')
            link.innerHTML = 'AQUI';
            div.appendChild(link)

            document.querySelector('#contenedor-eventos').appendChild(div)
        }
    }), false;
}


//Obtiene la situación de los asientos de un evento

function getEscenarioAjax() {
    let ajax2 = new XMLHttpRequest();
    ajax2.open("GET", '../server/eventos.json', true);
    ajax2.send();
    //si si ha terminado de enviar y la respuesta es ok
    ajax2.addEventListener("readystatechange", (e) => {
        if (ajax2.readyState == 4 && ajax2.status == 200) {
            arrayEventos = JSON.parse(e.target.responseText)
            cargaEvento(arrayEventos)
        }
        if (ajax2.readyState == 4 && ajax2.status == 404) {

            arrayEventos = [];
            let div = document.createElement('div')
            div.appendChild(document.createElement('p').appendChild(document.createTextNode('No hay eventos. Puedes crear uno ')));
            let link = document.createElement('a')
            link.setAttribute('href', '../html/nuevo-evento.html')
            link.innerHTML = 'AQUI';
            div.appendChild(link)

            document.querySelector('#contenedor-eventos').appendChild(div)
        }

    }), false;
}

//Establece los asientos tras comprar
function setEscenario(arrayEventos) {
    ajax = new XMLHttpRequest();
    ajax.open("POST", "../server/post.php", true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(JSON.stringify(arrayEventos));

    //cuando lo envie
    ajax.addEventListener('readystatechange', () => {
        //si si ha terminado de enviar y recibir y la respuesta es ok
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log('AJAX POST: Actuliza asientos');
        } else if (ajax.status != 200) {
            alert('Se ha producido un error al guardar')
        }
    }, false)
}
//Obtiene los usuarios
function getUsuariosLogin() {
    let ajax2 = new XMLHttpRequest();
    ajax2.open("GET", './server/usuarios.json', true);
    ajax2.send();
    //si si ha terminado de enviar y la respuesta es ok
    ajax2.addEventListener("readystatechange", (e) => {
        if (ajax2.readyState == 4 && ajax2.status == 200) {
            usuariosGuardados = JSON.parse(e.target.responseText)
            console.log('AJAX GET: obtener usuarios. Resultado: Hay usuarios')
        }
        if (ajax2.readyState == 4 && ajax2.status == 404) {
            usuariosGuardados = []
            console.log('AJAX obetener usuarios. Resultado: No hay usuarios');
        }
    }), false;
}

//Hace un GET-> si no encuentrael usuarios.json hace un POST y lo crea asi: [usuarios]; 
//Si se le vuelve a llamar hace GET y como existe push de 1 usuarios al array y guarda 

function guardaAjaxUsuario(usuario) {
    ajax = new XMLHttpRequest();
    ajax.open("GET", '../server/usuarios.json', true);
    ajax.send();
    //si si ha terminado de enviar y la respuesta es ok
    ajax.addEventListener("readystatechange", (e) => {

        //Si existe el usuarios json..
        if (ajax.readyState == 4 && ajax.status == 200) {

            let arrayusuarios = JSON.parse(e.target.responseText);

            arrayusuarios.push(usuario);

            let usuariosActualizado = JSON.stringify(arrayusuarios);
            ajax = new XMLHttpRequest();
            //
            ajax.open("POST", "../server/postUsuario.php", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(usuariosActualizado);

            //cuando lo envie
            ajax.addEventListener('readystatechange', () => {
                //si si ha terminado de enviar y recibir y la respuesta es ok
                if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log('AJAX POST: push de usuario a array y guardar');
                } else if (ajax.status != 200) {
                    alert('Se ha producido un error al guardar')
                }
            }, false)

        }
        //Si NO existe usuarios.json lo crea con array vacío
        if (ajax.readyState == 4 && ajax.status == 404) {

            let baseArray = JSON.stringify([usuario]);
            ajax = new XMLHttpRequest();
            //
            ajax.open("POST", "../server/postUsuario.php", true);
            ajax.setRequestHeader("Content-type", "application/json");
            ajax.send(baseArray);

            //cuando lo envie
            ajax.addEventListener('readystatechange', () => {
                //si si ha terminado de enviar y recibir y la respuesta es ok
                if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log('AJAX POST: array con 1 usuario');
                } else if (ajax.status != 200) {
                    alert('Se ha producido un error al guardar')
                }
            }, false)
        }
    }), false;

}