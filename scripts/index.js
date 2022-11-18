"use strict"

//form
const form = document.querySelector('#newEvent');
const inputs = document.querySelectorAll('.form-control');


//comprurba si hay user logueado
if (sessionStorage.user) {
    document.querySelector('.container').remove();
    document.querySelector('#lista').classList.add('user-identificado');
    document.querySelector('#lista').classList.remove('user-no-identificado');
    window.location = './html/eventos.html?user=' + (JSON.parse(sessionStorage.user)).usuario

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

//Botón muestra password login
let tipoInput = document.querySelector('#pass').getAttribute('type');
document.querySelector('.show-password').addEventListener('mouseover', () => {
    if (tipoInput == 'password') {
        document.querySelector('#pass').setAttribute('type', 'text')
    } else {
    }
    
})
document.querySelector('.show-password').addEventListener('mouseleave', () => {
    if (tipoInput == 'password') {
        document.querySelector('#pass').setAttribute('type', 'password')
    } else {
    }
})


