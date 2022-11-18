"use strict"

//form
const form = document.querySelector('#newEvent');
const inputs = document.querySelectorAll('.form-control');

//muestra nombre del usuario
let userId = location.href.split('user=')[1] || JSON.parse(sessionStorage.user).usuario;
if (typeof userId !== 'undefined' || sessionStorage.user) {
    document.querySelector('#nombreUser').innerHTML = 'Bienvenido ' + userId;
    document.querySelector('#logout').addEventListener('click', () => {
        sessionStorage.clear()
        window.location = '../index.html'
    })

}
//si no hay errores enviar
form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => {
        validar(input.name, input.value)
    });

    let inputsInvalidos = document.querySelectorAll('.input-invalido');

    if (!inputsInvalidos.length) {
        let values = [];
        [...inputs].map(input => [values[input.name] = input.value])
        enviar(values);
    } else {
        console.log('Error: hay algún input inválido');
        inputsInvalidos[0].scrollIntoView();

    }
    return
}, false);

//Validación inputs
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        e.preventDefault()
        e.keyCode != 9 ? validar(e.target.name, e.target.value) : ''
    }, false);
})
inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        e.preventDefault()
        e.keyCode != 9 ? validar(e.target.name, e.target.value) : ''
    }, false);
})

//Cargar imagen
let inputImagen = document.querySelector('#input-imagen');
inputImagen.addEventListener('input', () => {
    cargaImagen()
    let grupoImagen = document.querySelector('#grupo-imagen');
    let imagen = inputImagen.files[0];

    if (grupoImagen.classList.contains('input-valido')) {
        let reader = new FileReader();
        reader.readAsDataURL(imagen);

        reader.addEventListener("load", () => {
            previewImagen.src = reader.result;
            captionImagen.innerHTML = imagen.name;
            document.querySelector('#anyadir').scrollIntoView();
        }, false);
    }
}, false)
