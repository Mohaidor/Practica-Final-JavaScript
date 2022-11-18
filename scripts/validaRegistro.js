'use strict'
//guarda evento en ajax
function enviar(values) {

    let usuario = values['usuario'];
    //pass encriptado
    let pass = btoa(values['pass']);
    let pass2 = values['pass2']

    let objUser = {
        usuario: usuario,
        pass: pass,
    }

    //TODO:Cambio a AJAX
    /*if (localStorage) {
        usuariosGuardados.push(objUser);
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados))
    }*/
    console.log(objUser);
    guardaAjaxUsuario(objUser)
    alert('Usuario añadido correctamente')
    sessionStorage.setItem('user', JSON.stringify(objUser))
    window.location = './eventos.html?user=' + objUser.usuario
}


function validar(name, value) {

    switch (name) {
        case 'usuario':
            validaNombre(value);
            break;
        case 'pass':
            validaPass(value);
            break;
        case 'pass2':
            validaPass2(document.querySelector('#pass').value, value);
            break;
        default:
            break;
    }

}
///////////////////////////////////////////////////////////////Validación campo a campo//////////////////////////////////////////////////////////////////////////////
//Se explica el primero; Los demas son parecidos; Si hay algo diferente se explica

let validaNombre = (nombre) => {

    let grupoUsuario = document.querySelector('#grupo-usuario');
    let errorUsuario = document.querySelector('#grupo-usuario .error');
    let sonEspacios = (/^\s+$/g).test(nombre);
    let vacio = nombre.length == 0
    let corto = nombre.length < 2;

    if (vacio) {

        grupoUsuario.classList.add('input-invalido');
        grupoUsuario.classList.remove('input-valido');

        errorUsuario.innerHTML = 'El Nombre no puede quedar vacío'

    } else if (sonEspacios) {

        grupoUsuario.classList.add('input-invalido');
        grupoUsuario.classList.remove('input-valido');

        errorUsuario.innerHTML = 'El nombre no puede quedar vacío'

    } else if (corto) {

        grupoUsuario.classList.add('input-invalido');
        grupoUsuario.classList.remove('input-valido');

        errorUsuario.innerHTML = 'El nombre tiene que ser mayor a 1 carácter';

    } else {
        grupoUsuario.classList.add('input-valido');
        grupoUsuario.classList.remove('input-invalido');

    }
}

let validaPass = (password) => {


    let grupoPass = document.querySelector('#grupo-pass');
    let errorPass = document.querySelector('#grupo-pass .error');



    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let isValid = password.match(reg);
    if (/^\s*$/.test(password)) {

        grupoPass.classList.add('input-invalido');
        grupoPass.classList.remove('input-valido');

        errorPass.innerHTML = "El password no puede quedar vacío"

    } else if (!isValid) {

        grupoPass.classList.add('input-invalido');
        grupoPass.classList.remove('input-valido');

        errorPass.innerHTML = "El password deben ser al menos 8 caracteres,al menos una mayúscula, una minúscula y un numero"
    } else {
        grupoPass.classList.add('input-valido');
        grupoPass.classList.remove('input-invalido');
    }
};
let validaPass2 = (password, password2) => {

    let grupoPass2 = document.querySelector('#grupo-pass2');
    let errorPass2 = document.querySelector('#grupo-pass2 .error');

    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let isValid = password2.match(reg);

    if (/^\s*$/.test(password2)) {
        grupoPass2.classList.add('input-invalido');
        grupoPass2.classList.remove('input-valido');

        errorPass2.innerHTML = "La verificación no puede quedar vacía"

    } else if (password !== password2) {
        grupoPass2.classList.add('input-invalido');
        grupoPass2.classList.remove('input-valido');

        errorPass2.innerHTML = "Los passwords no coinciden"

    } else if (!isValid) {
        grupoPass2.classList.add('input-invalido');
        grupoPass2.classList.remove('input-valido');

        errorPass2.innerHTML = "El password deben ser al menos 8 caracteres,al menos una mayúscula, una minúscula y un numero";

    } else {
        grupoPass2.classList.add('input-valido');
        grupoPass2.classList.remove('input-invalido');
    }
};


function resetForm() {
    document.querySelectorAll('.form-group').forEach(group => { group.classList.remove('input-valido') });
    document.querySelectorAll('.form-control').forEach(input => input.value = "");
}