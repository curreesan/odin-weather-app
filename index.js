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
    document.getElementById("city-name").textContent = w.city;
    document.getElementById("temperature").textContent = `${w.temp}°F`;
    document.getElementById("date-time").textContent = w.datetime;
    document.getElementById("condition").textContent = w.conditions;
    document.getElementById("humidity").textContent = `H: ${w.humidity}%`;

    section.classList.remove("hidden");
  } catch (err) {
    errorMsg.textContent = "City not found — try Tokyo, London, Paris...";
    errorMsg.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }

  input.value = "";
});
