document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=America%2FSao_Paulo`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var temperature = data.current_weather.temperature;
            var humidity = `${data.current_weather?.humidity} %` ?? 'Umidade não informada';
            updateWeatherCard(temperature, humidity);
        })
        .catch(error => {
            alert('Erro ao obter dados da API: ' + error);
        });
}

function onError(error) {
    alert('Erro ao obter localização: ' + error.message);
}

function updateWeatherCard(temperature, humidity) {
    document.getElementById('temperature').textContent = temperature + '°C';
    document.getElementById('humidity').textContent = humidity;
}