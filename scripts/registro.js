"use strict"

//form
const form = document.querySelector('#newEvent');
const inputs = document.querySelectorAll('.form-control');

//Si no hay errores enviar
form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => {
        validar(input.name, input.value)
    });

    let inputsInvalidos = document.querySelectorAll('.input-invalido');

    if (!inputsInvalidos .length) {
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
//Botón muestra password
let inputPass = document.querySelector('.show-password');
let tipoInput = document.querySelector('#pass').getAttribute('type');

inputPass.addEventListener('mouseover', () => {
    if (tipoInput == 'password') {
        document.querySelector('#pass').setAttribute('type', 'text')
        inputPass.setAttribute('src', '../resources/open-eye-icon.png');

    }
})
inputPass.addEventListener('mouseleave', () => {
    if (tipoInput == 'password') {
        document.querySelector('#pass').setAttribute('type', 'password')
        document.querySelector('.show-password').setAttribute('src', '../resources/closed-eye-icon.png');
        
    }
})


let inputPass2 = document.querySelector('.show-password2');
let tipoInputPass2 = document.querySelector('#pass2').getAttribute('type');
//Botón muestra verificación password
inputPass2.addEventListener('mouseover', () => {
    if (tipoInputPass2 == 'password') {
        document.querySelector('#pass2').setAttribute('type', 'text')
        inputPass2.setAttribute('src', '../resources/open-eye-icon.png');
    } else {
    }
    
})
inputPass2.addEventListener('mouseleave', () => {
    if (tipoInputPass2 == 'password') {
        document.querySelector('#pass2').setAttribute('type', 'password')
        inputPass2.setAttribute('src', '../resources/closed-eye-icon.png');

    } else {
    }
    
})