"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");
function checkWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = "paste your api key here"; //attention: you have to put your api key in here
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = yield fetch(url);
            const weatherData = yield response.json();
            if (weatherData.cod === "404") {
                handleNotFoundError();
                return;
            }
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error("An error occurred while fetching weather data:", error);
            handleNotFoundError();
        }
    });
}
function handleNotFoundError() {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    console.log("Error: City not found or API request failed");
}
function displayWeatherInfo(weatherData) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    console.log("Weather data:", weatherData);
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    const temperatureValue = (_b = (_a = weatherData.main) === null || _a === void 0 ? void 0 : _a.temp) !== null && _b !== void 0 ? _b : null;
    const descriptionValue = (_d = (_c = weatherData.weather) === null || _c === void 0 ? void 0 : _c[0].description) !== null && _d !== void 0 ? _d : null;
    const humidityValue = (_f = (_e = weatherData.main) === null || _e === void 0 ? void 0 : _e.humidity) !== null && _f !== void 0 ? _f : null;
    const windSpeedValue = (_h = (_g = weatherData.wind) === null || _g === void 0 ? void 0 : _g.speed) !== null && _h !== void 0 ? _h : null;
    temperature.innerHTML = temperatureValue ? `${Math.round(temperatureValue - 273.15)}°C` : "";
    description.innerHTML = descriptionValue || "";
    humidity.innerHTML = humidityValue !== null ? `${humidityValue}%` : "";
    windSpeed.innerHTML = windSpeedValue !== null ? `${windSpeedValue}Km/H` : "";
    setWeatherImage(weatherData);
}
function setWeatherImage(weatherData) {
    var _a, _b;
    const weatherMain = (_b = (_a = weatherData.weather) === null || _a === void 0 ? void 0 : _a[0].main) !== null && _b !== void 0 ? _b : null;
    switch (weatherMain) {
        case "Clouds":
            weatherImg.src = "./images/cloud.png";
            break;
        case "Clear":
            weatherImg.src = "./images/clear.png";
            break;
        case "Rain":
            weatherImg.src = "./images/rain.png";
            break;
        case "Mist":
            weatherImg.src = "./images/mist.png";
            break;
        case "Snow":
            weatherImg.src = "./assets/snow.png";
            break;
        default:
            weatherImg.src = ""; // Set a default image or leave it empty based on your design
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});
