const API_KEY = "5a7afdbde767b16617f037feefabd4b0";
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

const query = document.getElementById("input-city");
const searchBtn = document.querySelector(".search-btn");
const cityTitle = document.getElementById("city");
const temperature = document.getElementById("temp");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const errorMessage = document.getElementById("error-message");

const getWeather = async (city) => {
    const response = await fetch(URL + city);
    const data = await response.json();
    displayWeather(data);
};

const displayWeather = (weatherData) => {
    if (weatherData.cod === 200) {
        errorMessage.innerText = "";
        cityTitle.innerText = weatherData.name;
        temperature.innerText = Math.round(weatherData.main.temp) + "°C";
        description.innerText = weatherData.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        weatherIcon.alt = weatherData.name;
        console.log(weatherData);
    } else {
        cityTitle.innerText = "";
        temperature.innerText = "";
        description.innerText = "";
        weatherIcon.src = "";
        weatherIcon.alt = "";
        errorMessage.innerText = "City not found";
    }
};

searchBtn.addEventListener("click", () => {
    getWeather(query.value);
});
