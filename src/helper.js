export const WeatherHelpers = {
  _isCelsius: false,

  iconMap: {
    "clear-day": "sunny-outline",
    "clear-night": "moon-outline",
    "partly-cloudy-day": "partly-sunny-outline",
    "partly-cloudy-night": "cloudy-night-outline",
    /* prettier-ignore */
    "cloudy": "cloudy-outline",
    /* prettier-ignore */
    "rain": "rainy-outline",
  },

  // Returns your mapped value
  getIcon(iconName) {
    return this.iconMap[iconName];
  },

  //Fahrenheit → Celsius (rounded)
  fToC(f) {
    if (typeof f !== "number") return null;
    return Math.round(((f - 32) * 5) / 9);
  },

  //Celsius → Fahrenheit
  cToF(c) {
    if (typeof c !== "number") return null;
    return Math.round((c * 9) / 5 + 32);
  },

  get currentUnit() {
    return this._isCelsius ? "°C" : "°F";
  },

  convert(tempInF) {
    return this._isCelsius ? this.fToC(tempInF) : tempInF;
  },

  toggle() {
    this._isCelsius = !this._isCelsius;
  },

  setCelsius() {
    this._isCelsius = true;
  },
  setFahrenheit() {
    this._isCelsius = false;
  },
};
