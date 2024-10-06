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

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "484ae542b9ffa311f44109c1a4aoa2t3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayWeather)
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
