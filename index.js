const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  try {
    const api_key = "3134404e374899e664aa674e60e3e95d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const response = await fetch(url);
    const weather_data = await response.json();

    if (weather_data.cod === "404") {
      handleNotFoundError();
      return;
    }

    displayWeatherInfo(weather_data);
  } catch (error) {
    console.error("An error occurred while fetching weather data:", error);
    handleNotFoundError();
  }
}

function handleNotFoundError() {
  location_not_found.style.display = "flex";
  weather_body.style.display = "none";
  console.log("Error: City not found or API request failed");
}

function displayWeatherInfo(weather_data) {
  console.log("Weather data:", weather_data);

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  const temperatureValue = weather_data.main ? weather_data.main.temp - 273.15 : null;
  const descriptionValue = weather_data.weather ? weather_data.weather[0].description : null;
  const humidityValue = weather_data.main ? weather_data.main.humidity : null;
  const windSpeedValue = weather_data.wind ? weather_data.wind.speed : null;

  temperature.innerHTML = temperatureValue ? `${Math.round(temperatureValue)}°C` : "";
  description.innerHTML = descriptionValue || "";
  humidity.innerHTML = humidityValue !== null ? `${humidityValue}%` : "";
  wind_speed.innerHTML = windSpeedValue !== null ? `${windSpeedValue}Km/H` : "";

  setWeatherImage(weather_data);
}

function setWeatherImage(weather_data) {
  const weatherMain = weather_data.weather ? weather_data.weather[0].main : null;

  switch (weatherMain) {
    case "Clouds":
      weather_img.src = "/images/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/images/clear.png";
      break;
    case "Rain":
      weather_img.src = "/images/rain.png";
      break;
    case "Mist":
      weather_img.src = "/images/mist.png";
      break;
    case "Snow":
      weather_img.src = "/assets/snow.png";
      break;
    default:
      weather_img.src = ""; // Set a default image or leave it empty based on your design
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
