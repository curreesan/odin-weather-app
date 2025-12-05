export function extractWeatherData(rawData) {
  if (!rawData) return null;

  const c = rawData.currentConditions;

  const weatherObject = {
    city: rawData.resolvedAddress,
    datetime: c.datetime,
    conditions: c.conditions,
    temp: Math.round(c.temp),
    feelsLike: Math.round(c.feelslike),
    humidity: c.humidity,
    icon: c.icon,
  };

  console.log(weatherObject);
  return weatherObject;
}
