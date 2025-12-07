export function extractWeatherData(rawData) {
  if (!rawData) return null;

  const c = rawData.currentConditions;

  const weatherObject = {
    city: rawData.resolvedAddress,
    datetime: c.datetime,
    conditions: c.conditions,
    temp: Math.round(c.temp),
    humidity: Math.round(c.humidity),
    icon: c.icon,
    days: rawData.days.slice(1, 6).map((day) => ({
      date: day.datetime,
      icon: day.icon,
      temp: Math.round(day.temp),
    })),
  };

  console.log(weatherObject);
  return weatherObject;
}
