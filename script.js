document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar el menú desplegable
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Conexión a la API de Clima
    const weatherApiKey = '1756ee3d5d8db48651990aeecc683673'; // Mi API key
    const city = 'Buenos Aires'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Ver los datos en la consola
            mostrarDatosClima(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API de clima:', error);
        });

    function mostrarDatosClima(data) {
        const apiDataContainer = document.getElementById('api-data');
        if (apiDataContainer) {
            apiDataContainer.innerHTML = `
                <h3>Clima en ${data.name}</h3>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Humedad: ${data.main.humidity}%</p>
                <p>Condición: ${data.weather[0].description}</p>
            `;
        }
    }

    // Conexión a la API de Reqres para obtener usuarios
    const reqresApiUrl = 'https://reqres.in/api/users';

    fetch(reqresApiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Ver los datos en la consola
            mostrarDatosUsuarios(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de usuarios:', error);
        });

    function mostrarDatosUsuarios(data) {
        const usersContainer = document.getElementById('users-data');
        if (usersContainer) {
            usersContainer.innerHTML = '<h2>Usuarios</h2>';
            data.data.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `${user.first_name} ${user.last_name} - ${user.email}`;
                usersContainer.appendChild(userDiv);
            });
        }
    }

    // Validación de formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que el formulario se envíe

            let username = document.getElementById('username').value.trim();
            let password = document.getElementById('password').value.trim();
            let errorMessage = document.getElementById('error-message');

            if (username === '' || password === '') {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                $('#successModal').modal('show'); // Mostrar el modal de Bootstrap
            }
        });
    }

    // Redirigir al hacer clic en el botón "Aceptar" del modal
    const redirectBtn = document.getElementById('redirectBtn');
    if (redirectBtn) {
        redirectBtn.addEventListener('click', function() {
            window.location.href = 'api.html'; // URL de la página que consume la API de reqres
        });
    }
    
    // Validación de datos del formulario
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

        return true;
    }
});

