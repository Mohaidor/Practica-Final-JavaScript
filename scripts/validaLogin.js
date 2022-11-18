'use strict'
//TODO:Cambio a AJAX
//let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios") || '[]');
console.log(atob('UXdlcnR5MTA5Mg=='));
window.addEventListener('load', getUsuariosLogin(), false)



let usuariosGuardados;

//guarda evento en ajax
function enviar(values) {
    
    let usuario = values['usuario'];
    let pass = values['pass'];
    
    let objUser = {
        usuario: usuario,
        pass: pass,
    }
    
    
    console.log(usuariosGuardados);

    compruebaUser(usuariosGuardados, objUser)


    //TODO:Cambio a AJAX
    /*if (localStorage.usuarios) {

        //Obtener json y parsear a array de objetos eventos
        let arrayUsuarios = JSON.parse(localStorage.usuarios);
        //filtra eventos de hoy en adelante
        arrayUsuarios = compruebaUser(arrayUsuarios, objUser)
    }else {
        compruebaUser([], objUser)
        document.querySelector('#pass').value = '';
    }*/


}


function validar(name, value) {

    switch (name) {
        case 'usuario':
            validaNombre(value);
            break;
        case 'pass':
            validaPass(value);
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

function resetForm() {
    document.querySelectorAll('.form-group').forEach(group => { group.classList.remove('input-valido') });
    document.querySelectorAll('.form-control').forEach(input => input.value = "");
}

function compruebaUser(arrayUsuarios, objUser) {


    let nombre = arrayUsuarios.find(user => user.usuario === objUser.usuario)
    let pass = arrayUsuarios.find(user => atob(user.pass) === objUser.pass)

    let grupoUsuario = document.querySelector('#grupo-usuario');
    let errorUsuario = document.querySelector('#grupo-usuario .error');

    let grupoPass = document.querySelector('#grupo-pass');
    let errorPass = document.querySelector('#grupo-pass .error');


    if (typeof nombre === 'undefined') {
        grupoUsuario.classList.add('input-invalido');
        grupoUsuario.classList.remove('input-valido');

        errorUsuario.innerHTML = 'Usuario no encontrado'
    } else if (typeof pass === 'undefined') {
        grupoPass.classList.add('input-invalido');
        grupoPass.classList.remove('input-valido');

        errorPass.innerHTML = "El password no es correcto"
    } else {
        grupoUsuario.classList.add('input-valido');
        grupoUsuario.classList.remove('input-invalido');
        grupoPass.classList.add('input-valido');
        grupoPass.classList.remove('input-invalido');

        document.querySelector('#lista').classList.add('user-identificado');
        document.querySelector('#lista').classList.remove('user-no-identificado');

        sessionStorage.setItem('user', JSON.stringify(objUser))






        window.location = './html/eventos.html?user=' + objUser.usuario
    }
}