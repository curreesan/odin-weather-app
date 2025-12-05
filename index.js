import { getWeatherData } from "./src/api.js";
import { extractWeatherData } from "./src/utils.js";

async function testIt() {
  const data = await getWeatherData("Tokyo");
  if (data) extractWeatherData(data);
}
testIt();
