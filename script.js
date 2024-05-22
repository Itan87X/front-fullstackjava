  // JavaScript para mostrar/ocultar el menú desplegable

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
});


  // const menuToggle = document.querySelector('.menu-toggle');
  // const mainNav = document.querySelector('.main-nav');

  // menuToggle.addEventListener('click', () => {
  //   mainNav.classList.toggle('active');
  // });

//para login

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let errorMessage = document.getElementById('error-message');

    if (username === '' || password === '') {
        errorMessage.style.display = 'block';
    } else {
        errorMessage.style.display = 'none';
        // window.location.href = 'otra_pagina.html';
        alert('Inicio de sesión exitoso');
    }
});

  //para validar datos del formulario

  function validarFormulario() {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();

    // Validar el campo de nombre
    if (!/^[a-zA-Z]+$/.test(name)) {
      alert('Por favor, ingresa un nombre válido (solo letras).');
      return false;
    }

    // Validar el campo de correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return false;
    }

    // Validar el campo de número de teléfono celular
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Por favor, ingresa un número de teléfono celular válido (10 dígitos).');
      return false;
    }

    // Resto del código para enviar el formulario o realizar otras acciones
    // ...

    return true;
  }



