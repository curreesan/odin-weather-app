const API_KEY = "4ZLKZTCHS4DKYBMYADV5SAQYT";

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
}

function getRequiredData(dataFromAPI) {
  const currentConditions = dataFromAPI.currentConditions;

  const requiredObject = {
    city: dataFromAPI.resolvedAddress,
    datetime: currentConditions.datetime,
    conditions: currentConditions.conditions,
    temperature: currentConditions.temp,
    feelslike: currentConditions.feelslike,
    humidty: currentConditions.humidity,
  };

  console.log(requiredObject);
  return requiredObject;
}

async function testIt() {
  const data = await getWeatherData("Tokyo");
  if (data) getRequiredData(data);
}
testIt();
