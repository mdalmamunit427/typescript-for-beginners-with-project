interface WeatherData {
    cod: string;
    main?: {
      temp: number;
      humidity: number;
    };
    weather?: {
      description: string;
      main: string;
    }[];
    wind?: {
      speed: number;
    };
  }
  
  const inputBox = document.querySelector(".input-box") as HTMLInputElement;
  const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
  const weatherImg = document.querySelector(".weather-img") as HTMLImageElement;
  const temperature = document.querySelector(".temperature") as HTMLElement;
  const description = document.querySelector(".description") as HTMLElement;
  const humidity = document.getElementById("humidity") as HTMLElement;
  const windSpeed = document.getElementById("wind-speed") as HTMLElement;
  
  const locationNotFound = document.querySelector(".location-not-found") as HTMLElement;
  const weatherBody = document.querySelector(".weather-body") as HTMLElement;
  
  async function checkWeather(city: string) {
    try {
      const apiKey = "3134404e374899e664aa674e60e3e95d";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
      const response = await fetch(url);
      const weatherData: WeatherData = await response.json();
  
      if (weatherData.cod === "404") {
        handleNotFoundError();
        return;
      }
  
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error("An error occurred while fetching weather data:", error);
      handleNotFoundError();
    }
  }
  
  function handleNotFoundError() {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    console.log("Error: City not found or API request failed");
  }
  
  function displayWeatherInfo(weatherData: WeatherData) {
    console.log("Weather data:", weatherData);
  
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
  
    const temperatureValue = weatherData.main?.temp ?? null;
    const descriptionValue = weatherData.weather?.[0].description ?? null;
    const humidityValue = weatherData.main?.humidity ?? null;
    const windSpeedValue = weatherData.wind?.speed ?? null;
  
    temperature.innerHTML = temperatureValue ? `${Math.round(temperatureValue - 273.15)}°C` : "";
    description.innerHTML = descriptionValue || "";
    humidity.innerHTML = humidityValue !== null ? `${humidityValue}%` : "";
    windSpeed.innerHTML = windSpeedValue !== null ? `${windSpeedValue}Km/H` : "";
  
    setWeatherImage(weatherData);
  }
  
  function setWeatherImage(weatherData: WeatherData) {
    const weatherMain = weatherData.weather?.[0].main ?? null;
  
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
  