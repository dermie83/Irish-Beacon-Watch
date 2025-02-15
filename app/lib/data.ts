import axios from "axios";
import { sql } from '@vercel/postgres';
import {
  CurrentWeatherType, 
  DailyHistoricaltWeatherProp, 
  DailytWeatherType, 
  HourlyMarineProp, 
  HourlyWeatherType, 
  LighthouseProps
      } from './definitions';
// import { formatCurrency } from './utils';

export async function fetchLighthouses() {
  try {
    const data = await sql<LighthouseProps>`SELECT * FROM lighthouse`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lighthouse data.');
  }
}

export async function getMarineForecast(
  lat: number,
  lon: number,
  timezone: string,
  // Promise<{current:object, daily:object, hourly:object}> {
): Promise<{
  hourly: HourlyMarineProp[];
}> {
  return await axios
  .get("https://marine-api.open-meteo.com/v1/marine?hourly=wave_height",
    {
      params: {
        latitude: lat,
        longitude: lon,
        timezone,
      },
    }
  )
  .then((response:any) => {
    return {
      hourly: parseHourlyMarineForecase(response.data),
    };
  });
}

function parseHourlyMarineForecase({ hourly }: any): HourlyMarineProp[] {
  // console.log("Hourly Marine time.....",hourly.time);
  return hourly.time.map((time: string, index: number) => {
    return {
      timestamp: time, //second to milliseconds
      waveHeight: hourly.wave_height[index],
    };
  });
}

export async function getHistoricalWeather(
  lat: number,
  lon: number,
  timezone: string,
  // Promise<{current:object, daily:object, hourly:object}> {
): Promise<{
  daily: DailyHistoricaltWeatherProp[];
}> {
  return await axios
  .get("https://archive-api.open-meteo.com/v1/archive?start_date=2000-01-01&end_date=2001-12-31&daily=wind_speed_10m_max,wind_gusts_10m_max",
      {
        params: {
          latitude: lat,
          longitude: lon,
          timezone,
        },
      }
    )
    .then((response:any) => {
      return {
        daily: parseHistoricalDailyWeather(response.data),
      };
    });
}

function parseHistoricalDailyWeather({ daily }: any): DailyHistoricaltWeatherProp[] {
  // console.log("Daily historical time.....",daily.time);
  return daily.time.map((time: number, index: number) => {
    return {
      timestamp: time, //second to milliseconds
      maxWind: Math.round(daily.wind_speed_10m_max[index]),
      maxGust: Math.round(daily.wind_gusts_10m_max[index]),
    };
  });
}


export async function getWeather(
    lat: number,
    lon: number,
    timezone: string
    // Promise<{current:object, daily:object, hourly:object}> {
  ): Promise<{
    current: CurrentWeatherType;
    daily: DailytWeatherType[];
    hourly: HourlyWeatherType[];
  }> {
  
    return await axios
      .get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&precipitation_unit=inch&timeformat=unixtime",
        {
          params: {
            latitude: lat,
            longitude: lon,
            timezone,
          },
        }
      )
      .then((response:any) => {
        //OR then(({data}))
        return {
          current: parseCurrentWeather(response.data),
          daily: parseDailyWeather(response.data),
          hourly: parseHourlyWeather(response.data),
        };
      });
  }

  function parseCurrentWeather({ current, daily }: any): CurrentWeatherType {
    const {
      temperature_2m: currentTemp,
      wind_speed_10m: windSpeed,
      weather_code: iconCode,
    } = current;
    const {
      temperature_2m_max: [maxTemp],
      temperature_2m_min: [minTemp],
      apparent_temperature_max: [maxFeelsLike],
      apparent_temperature_min: [minFeelsLike],
      precipitation_sum: [precip],
    } = daily;
  
    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(maxTemp),
      lowTemp: Math.round(minTemp),
      highFeelsLike: Math.round(maxFeelsLike),
      lowFeelsLike: Math.round(minFeelsLike),
      windSpeed: Math.round(windSpeed),
      precip: Math.round(precip * 100) / 100,
      iconCode: iconCode,
    };
  }
  
  function parseDailyWeather({ daily }: any): DailytWeatherType[] {
    return daily.time.map((time: number, index: number) => {
      return {
        timestamp: time * 1000, //second to milliseconds
        iconCode: daily.weather_code[index],
        maxTemp: Math.round(daily.temperature_2m_max[index]),
      };
    });
  }
  
  function parseHourlyWeather({ hourly, current }: any): HourlyWeatherType[] {
    // console.log(current.time * 1000);
    return hourly.time
      .map((time: number, index: number) => {
        return {
          timestamp: time * 1000,
          iconCode: hourly.weather_code[index],
          maxTemp: Math.round(hourly.temperature_2m[index]),
          feelsLike: Math.round(hourly.apparent_temperature[index]),
          windSpeed: Math.round(hourly.wind_speed_10m[index]),
          precip: Math.round(hourly.precipitation[index] * 100) / 100,
        };
      })
      .filter(({ timestamp }: any) => timestamp >= current.time * 1000);
  }
