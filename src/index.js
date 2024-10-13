function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-date");
  let windElement = document.querySelector(".current-details strong");
  let temperatureIcon = document.querySelector(".current-temperature-icon");

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let description = response.data.condition.description;
  let windSpeed = Math.round(response.data.wind.speed);

  temperatureElement.innerHTML = temperature;
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = formatDate(new Date()) + ", " + description;
  windElement.innerHTML = `${windSpeed} km/h`;

  let iconCode = response.data.condition.icon;
  temperatureIcon.innerHTML = `<img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconCode}.png" alt="${description}" />`;
}

function displayForecast(dailyData) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    let dayForecast = dailyData[i];
    let dayDiv = document.createElement("div");
    dayDiv.classList.add("weather-forecast-day");

    let dateElement = document.createElement("div");
    dateElement.classList.add("weather-forecast-date");
    dateElement.innerHTML = formatDay(new Date(dayForecast.time * 1000));

    let iconElement = document.createElement("img");
    iconElement.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${dayForecast.condition.icon}.png`;
    iconElement.classList.add("weather-forecast-icon");

    let temperaturesElement = document.createElement("div");
    temperaturesElement.classList.add("weather-forecast-temperatures");

    let maxTempElement = document.createElement("div");
    maxTempElement.classList.add("weather-forecast-temperature");
    maxTempElement.innerHTML = `<strong>${Math.round(
      dayForecast.temperature.maximum
    )}º</strong>`;

    let minTempElement = document.createElement("div");
    minTempElement.classList.add("weather-forecast-temperature");
    minTempElement.innerHTML = `${Math.round(
      dayForecast.temperature.minimum
    )}º`;

    temperaturesElement.appendChild(maxTempElement);
    temperaturesElement.appendChild(minTempElement);

    dayDiv.appendChild(dateElement);
    dayDiv.appendChild(iconElement);
    dayDiv.appendChild(temperaturesElement);

    forecastElement.appendChild(dayDiv);
  }
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "484ae542b9ffa311f44109c1a4aoa2t3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => {
      displayWeather(response);
      return axios.get(forecastUrl);
    })
    .then((forecastResponse) => {
      displayForecast(forecastResponse.data.daily);
    })
    .catch(function (error) {
      alert("City not found. Please try again!");
    });
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(date) {
  let options = { weekday: "long" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
