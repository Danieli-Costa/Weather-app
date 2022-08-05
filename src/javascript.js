// date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let nowHour = now.getHours();
if (nowHour < 10) {
  nowHour = `0${nowHour}`;
}

let nowMinute = now.getMinutes();
if (nowMinute < 10) {
  nowMinute = `0${nowMinute}`;
}

let h5 = document.querySelector("h5");
h5.innerHTML = `${day}, ${nowHour}:${nowMinute}`;

//search engine
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let apiKey = "b0fe589cc24a909e1d262c962ba031e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  debugger;
  let city = document.querySelector("#location").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "b0fe589cc24a909e1d262c962ba031e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

let formSearch = document.querySelector(".search-form");
formSearch.addEventListener("submit", searchCity);

search("New York");

//bonus point current location