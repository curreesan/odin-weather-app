const API_KEY = "4ZLKZTCHS4DKYBMYADV5SAQYT";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function getWeatherData(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/${encodeURIComponent(city)}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error("API fetch failed: ", error);
  }
}
