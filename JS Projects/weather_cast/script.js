const API_KEY = "5a7afdbde767b16617f037feefabd4b0";
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;

const query = document.getElementById("input-city");
const searchBtn = document.querySelector(".search-btn");
const cityTitle = document.getElementById("city");
const temperature = document.getElementById("temp");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const errorMessage = document.getElementById("error-message");

const lowsAndHighsTemperatures = document.getElementById("lows-and-highs");
const feelsLikeText = document.querySelector("#feels-like > .text");
const feelsLikeInfo = document.getElementById("feels-like-info");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

const sunriseText = document.querySelector("sunrise > .text");
const sunriseTitle = document.querySelector("sunrise > .title");
const sunriseImg = document.querySelector("sunrise > img");

const sunsetText = document.querySelector("sunset > .text");
const sunsetTitle = document.querySelector("sunset > .title");
const sunsetImg = document.querySelector("sunset > img");

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
        lowsAndHighsTemperatures.innerText =
            "Lows: " +
            Math.round(weatherData.main.temp_min) +
            "ºC | " +
            "Highs: " +
            Math.round(weatherData.main.temp_max) +
            "ºC";
        feelsLikeText.innerText = "Feels like: " + Math.round(weatherData.main.feels_like) + "°C";
        feelsLikeInfo.src = "./images/info24px.png";
        feelsLikeInfo.alt = "";
        humidity.innerText = "Humidity: " + weatherData.main.humidity + "%";
        windSpeed.innerText = "Wind Speed: " + Math.round(weatherData.wind.speed) + "m/s";
        sunriseText.innerText = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        sunsetText.innerText = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        console.log(weatherData);
    } else {
        cityTitle.innerText = "";
        temperature.innerText = "";
        description.innerText = "";
        weatherIcon.src = "";
        weatherIcon.alt = "";
        lowsAndHighsTemperatures.innerText = "";
        feelsLikeText.innerText = "";
        feelsLikeInfo.src = "";
        feelsLikeInfo.alt = "";
        humidity.innerText = "";
        windSpeed.innerText = "";

        sunriseText.innerText = "";
        sunriseTitle.innerText = "";
        sunsetText.innerText = "";

        errorMessage.innerText = "City not found";
    }
};

searchBtn.addEventListener("click", () => {
    getWeather(query.value);
});
