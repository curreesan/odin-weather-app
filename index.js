import { getWeatherData } from "./src/api.js";
import { extractWeatherData } from "./src/utils.js";

async function testIt() {
  const data = await getWeatherData("Tokyo");
  if (data) extractWeatherData(data);
}
testIt();

const form = document.getElementById("search-form");
const input = document.getElementById("location-input");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-message");
const section = document.getElementById("current-weather");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  loading.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  section.classList.add("hidden");

  try {
    const raw = await getWeatherData(city);
    const w = extractWeatherData(raw);

    // Update all fields
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const date = document.getElementById("date-time");
    const condition = document.getElementById("condition");
    const humidity = document.getElementById("humidity");
    const forecast = document.getElementById("forecast");

    cityName.textContent = w.city;
    temperature.textContent = `${w.temp}°F`;
    date.textContent = w.datetime;
    condition.textContent = w.conditions;
    humidity.textContent = `H: ${w.humidity}%`;

    w.days.forEach((day) => {
      const card = document.createElement("div");
      card.className = "forecast-card";

      card.innerHTML = `
            <div class="day"> ${day.date} </div>
            <div class="temperature"> ${day.temp} </div>
            <div class="condition"> ${day.icon} </div>
        `;

      forecast.appendChild(card);
    });

    section.classList.remove("hidden");
  } catch (err) {
    console.log(err);
    errorMsg.textContent = "City not found — try Tokyo, London, Paris...";
    errorMsg.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }

  input.value = "";
});
