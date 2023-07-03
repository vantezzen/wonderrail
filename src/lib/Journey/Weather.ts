import { JourneyStay } from "../types";
import { Weather as WeatherType } from "../types";

export default class Weather {
  async getWeatherForStay(stay: JourneyStay): Promise<WeatherType> {
    const urlParams = {
      latitude: stay.location.coordinates.lat,
      longitude: stay.location.coordinates.lng,
      start_date: this.getDateOneYearAgo(stay.timerange.start),
      end_date: this.getDateOneYearAgo(stay.timerange.end),
      daily:
        "temperature_2m_max,temperature_2m_min,temperature_2m_mean,sunrise,sunset,precipitation_sum",
      timezone: "Europe/Berlin",
    };
    const url = `https://archive-api.open-meteo.com/v1/archive?${new URLSearchParams(
      urlParams as any
    )}`;
    const response = await fetch(url);
    const weatherData = await response.json();

    return {
      timerange: structuredClone(stay.timerange),
      minTemperature: Math.min(...weatherData.daily.temperature_2m_min),
      avgTemperature: Math.round(
        weatherData.daily.temperature_2m_mean.reduce(
          (a: number, b: number) => a + b,
          0
        ) / weatherData.daily.temperature_2m_mean.length
      ),
      maxTemperature: Math.max(...weatherData.daily.temperature_2m_max),
      precipitationMin: Math.min(...weatherData.daily.precipitation_sum),
      precipitationMax: Math.max(...weatherData.daily.precipitation_sum),
    };
  }

  private getDateOneYearAgo(date: Date) {
    const dateOneYearAgo = new Date(date.getTime());
    dateOneYearAgo.setFullYear(dateOneYearAgo.getFullYear() - 1);
    return dateOneYearAgo.toISOString().split("T")[0];
  }
}
