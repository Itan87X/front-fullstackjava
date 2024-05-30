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
    const apiKey = '1756ee3d5d8db48651990aeecc683673'; // Mi API key
    const city = 'Buenos Aires'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Ver los datos en la consola
            mostrarDatosClima(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
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

    // Conexión a la API de Transporte
    const clientId = 'da333521da76499f8c6a2fc98a462d93';
    const clientSecret = 'b1C5E21fc4514aC09Cc17C5d4011708a';

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Utilizar un proxy para evitar problemas de CORS
    const apiBase = 'https://apitransporte.buenosaires.gob.ar/api';
    const endpoints = {
        subtesForecast: '/subtes/forecastGTFS',
        subtesServiceAlerts: '/subtes/serviceAlerts',
        colectivosFeedGtfs: '/colectivos/feed-gtfs',
        colectivosFeedGtfsFrequency: '/colectivos/feed-gtfs-frequency',
        colectivosServiceAlerts: '/colectivos/serviceAlerts',
        ecobiciStationStatus: '/ecobici/gbfs/stationStatus',
        ecobiciStationInformation: '/ecobici/gbfs/stationInformation',
        estacionamientos: '/transito/v1/estacionamientos',
        garajesComerciales: '/estacionamiento/garajesComerciales'
    };

    Object.keys(endpoints).forEach(key => {
        fetch(`${proxyUrl}${apiBase}${endpoints[key]}?client_id=${clientId}&client_secret=${clientSecret}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(`${key}: `, data); // Ver los datos en la consola
                mostrarDatosTransporte(key, data);
            })
            .catch(error => {
                console.error(`Error al obtener los datos de la API de ${key}:`, error);
                mostrarDatosTransporte(key, { error: error.message }); // Mostrar el error en el HTML
            });
    });

    function mostrarDatosTransporte(endpoint, data) {
        const transportDataContainer = document.getElementById('transport-data');
        if (transportDataContainer) {
            let content = '';
            switch (endpoint) {
                case 'subtesForecast':
                    content = `<h3>Pronóstico Subtes</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'subtesServiceAlerts':
                    content = `<h3>Alertas de Servicio Subtes</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'colectivosFeedGtfs':
                    content = `<h3>GTFS Colectivos</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'colectivosFeedGtfsFrequency':
                    content = `<h3>GTFS Frecuencia Colectivos</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'colectivosServiceAlerts':
                    content = `<h3>Alertas de Servicio Colectivos</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'ecobiciStationStatus':
                    content = `<h3>Estado de Estaciones Ecobici</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'ecobiciStationInformation':
                    content = `<h3>Información de Estaciones Ecobici</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'estacionamientos':
                    content = `<h3>Estacionamientos</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                case 'garajesComerciales':
                    content = `<h3>Garajes Comerciales</h3>
                               <pre>${JSON.stringify(data, null, 2)}</pre>`;
                    break;
                default:
                    content = '<p>No hay datos disponibles.</p>';
            }
            transportDataContainer.innerHTML += content;
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
            window.location.href = 'transporte.html'; // URL de la página que consume la API de transporte
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

