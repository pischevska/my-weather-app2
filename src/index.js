let now = new Date();
let time = document.querySelector("#time");

let hours = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, "0");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

let day = days[now.getDay()];

time.innerHTML = `${day}, ${hours}:${minutes}`;
///

function showTemperature(response) {
  let cityTemperature = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  console.log(cityTemperature);
  console.log(response);
  let temperature = Math.round(celsiusTemperature);
  cityTemperature.innerHTML = `${temperature}`;
  
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  
}

function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let showCity = document.querySelector("#city");
  showCity.innerHTML = `${cityInput.value}`;
  let apiKey = "aa22ab9168bfb952d8219da4fdb0c044";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", cityDisplay);
///
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
