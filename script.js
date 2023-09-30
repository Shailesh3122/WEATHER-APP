const inputBox = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "5257480a889f820f36e69a142002fdb5";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weatherData = await fetch(`${url}`).then(response => response.json()); 

    if(weatherData.cod === '404'){
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }

    // console.log(weatherData);

    weatherBody.style.display = "flex";

    locationNotFound.style.display = "none";

    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;

    description.innerHTML = `${weatherData.weather[0].description}`;

    humidity.innerHTML = `${weatherData.main.humidity}%`;

    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImg.src = "./cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "./clear.png";
            break;
        case 'Mist':
            weatherImg.src = "./mist.png";
            break;
        case 'Rain':
            weatherImg.src = "./rain.png";
            break;
        case 'Snow':
            weatherImg.src = "./snow-png.webp";
            break;
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});