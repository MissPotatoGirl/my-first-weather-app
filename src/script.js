//Get & display current weather based on searched name
function searchCity(event) {
  event.preventDefault();
  getCityName();
  displayDate();
}

function getCityName(position) {
  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector(".active-city-name");
  searchCity.innerHTML = searchInput.value;
  searchCity = searchInput.value;

  let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getInfo);
}

//Getting & displaying current weather based on location
function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "7fa08a5cce73b5c1c5b2cb4406f7781a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getInfo);
}

function getInfo(response) {
  console.log(response);
  let city = document.querySelector(".active-city-name");
  city.innerHTML = response.data.name;

  let locationTemp = Math.round(response.data.main.temp);
  locationTempElement = document.querySelector("#temp-today");
  locationTempElement.innerHTML = `🌡 ${locationTemp}ºC`;

  /* let locationRain = response.data.rain;
  locationRainElement = document.querySelector("#rain-today");
  locationRainElement.innerHTML = `☔️ ${locationRain} mm`;*/

  let locationWind = Math.round(response.data.wind.speed);
  locationWindElement = document.querySelector("#wind-today");
  locationWindElement.innerHTML = `🍃 ${locationWind} m/s`;
}

function displayCurrentLocation(event) {
  event.preventDefault();
  displayDate();

  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

//Show todays date
function displayDate() {
  let now = new Date();

  let getDay = now.getDay();
  let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let todayName = dayName[getDay];

  let getMonth = now.getMonth();
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let todaysMonth = month[getMonth];

  let today = now.getDate();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let todaysDate = document.querySelector(".todays-date");
  todaysDate.innerHTML = `${todayName} ${today} ${todaysMonth}, ${hours}:${minutes}`;
}

//set EventListners on buttons
let searchCityButton = document.querySelector("#search-city");
searchCityButton.addEventListener("click", searchCity);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", displayCurrentLocation);
