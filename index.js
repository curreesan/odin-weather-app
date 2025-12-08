import { getWeatherData } from "./src/api.js";
import { extractWeatherData } from "./src/utils.js";
import { WeatherHelpers } from "./src/helper.js";

async function testIt() {
  const data = await getWeatherData("Tokyo");
  if (data) extractWeatherData(data);
}
// testIt();

const form = document.getElementById("search-form");
const input = document.getElementById("location-input");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-message");
const section = document.getElementById("current-weather");

const celsiusBtn = document.querySelector(".celsius");
const fahrenheitBtn = document.querySelector(".fahrenheit");

let lastWeather = null;

form.addEventListener("submit", async (e) => {
  e?.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  loading.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  section.classList.add("hidden");

  try {
    const raw = await getWeatherData(city);
    const w = extractWeatherData(raw);
    renderWeather(w);
  } catch (err) {
    errorMsg.textContent = "City not found — try Tokyo, London, Paris...";
    errorMsg.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }

  input.value = "";
});

fahrenheitBtn.addEventListener("click", () => {
  WeatherHelpers.setFahrenheit();
  if (lastWeather) renderWeather(lastWeather);
});

celsiusBtn.addEventListener("click", () => {
  WeatherHelpers.setCelsius();
  if (lastWeather) renderWeather(lastWeather);
});

function renderWeather(w) {
  lastWeather = w;

  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const date = document.getElementById("date-time");
  const condition = document.getElementById("condition");
  const humidity = document.getElementById("humidity");
  const forecast = document.getElementById("forecast");

  cityName.textContent = w.city;
  temperature.textContent = `${WeatherHelpers.convert(w.temp)}${
    WeatherHelpers.currentUnit
  }`;
  date.textContent = w.datetime;
  condition.textContent = w.conditions;
  humidity.textContent = `H: ${w.humidity}%`;

  // Forecast
  forecast.innerHTML = "";
  w.days.forEach((day) => {
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <div class="fore-cast-icon">
        <ion-icon name="${WeatherHelpers.getIcon(day.icon)}"></ion-icon>
      </div>
      <div class="temperature big">${WeatherHelpers.convert(day.temp)}${
      WeatherHelpers.currentUnit
    }</div>
      <div class="day">${new Date(day.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}</div>
      <div class="condition small">${day.icon}</div>
    `;
    forecast.appendChild(card);
  });

  section.classList.remove("hidden");
}
