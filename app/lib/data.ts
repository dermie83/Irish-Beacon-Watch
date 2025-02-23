import axios from "axios";
import { sql } from '@vercel/postgres';
import {
  CurrentWeatherType, 
  DailyHistoricaltWeatherType, 
  DailytWeatherType, 
  HourlyMarineType,
  CurrentMarineType,
  HourlyWeatherType, 
  LighthouseType
      } from './definitions';



const ITEMS_PER_PAGE = 2;
export async function fetchLighthouses(
  currentPage: number,
  query: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<LighthouseType>
    `SELECT 
            lighthouse.id, 
            lighthouse.name, 
            lighthouse.latitude, 
            lighthouse.longitude, 
            lighthouse.towerHeight, 
            lighthouse.lightHeight, 
            lighthouse.range, 
            lighthouse.greatLighthouse,
            lighthouse.constructed,
            lighthouse.currentDate,
            (lighthouse.currentDate - lighthouse.constructed)/365 AS "age"
     FROM lighthouse
     WHERE
        lighthouse.name ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lighthouse location data.');
  }
}


export async function fetchLighthousePages(
  query: string,
) {
  try {
    const data = await sql`SELECT COUNT(*)
     FROM lighthouse
     WHERE
        lighthouse.name ILIKE ${`%${query}%`}
         LIMIT ${ITEMS_PER_PAGE}`;
     const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchMarineForecast(
  lat: number,
  lon: number,
  timezone: string,
): Promise<{
  current: CurrentMarineType;
  hourly: HourlyMarineType[];
}> {
  return await axios
  .get("https://marine-api.open-meteo.com/v1/marine?hourly=wave_height&current=wave_height,wave_direction,wave_period,wind_wave_height,swell_wave_height,ocean_current_velocity,ocean_current_direction",
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
      current: parseCurrentMarineForecast(response.data),
      hourly: parseHourlyMarineForecase(response.data),
    };
  });
}

function parseCurrentMarineForecast({ current }: any): CurrentMarineType {
  const {
    wave_height: waveHeight,
    wind_wave_height: wind_wave_height,
    swell_wave_height: swell_wave_height,
    wave_direction: wave_direction,
    wave_period: wave_period,
    ocean_current_velocity: ocean_current_velocity,
    ocean_current_direction: ocean_current_direction,
  } = current;
  return {
    waveHeight: Math.round(waveHeight),
    wind_wave_height: Math.round(wind_wave_height),
    swell_wave_height: Math.round(swell_wave_height),
    wave_direction: Math.round(wave_direction),
    wave_period: Math.round(wave_period),
    ocean_current_velocity: Math.round(ocean_current_velocity),
    ocean_current_direction: Math.round(ocean_current_direction),
  };
}

function parseHourlyMarineForecase({ hourly }: any): HourlyMarineType[] {
  // console.log("Hourly Marine time.....",hourly.time);
  return hourly.time.map((time: string, index: number) => {
    return {
      timestamp: time, //second to milliseconds
      waveHeight: hourly.wave_height[index],
    };
  });
}

export async function fetchHistoricalWeather(
  lat: number,
  lon: number,
  timezone: string,
  // Promise<{current:object, daily:object, hourly:object}> {
): Promise<{
  daily: DailyHistoricaltWeatherType[];
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

function parseHistoricalDailyWeather({ daily }: any): DailyHistoricaltWeatherType[] {
  // console.log("Daily historical time.....",daily.time);
  return daily.time.map((time: number, index: number) => {
    return {
      timestamp: time, //second to milliseconds
      maxWind: Math.round(daily.wind_speed_10m_max[index]),
      maxGust: Math.round(daily.wind_gusts_10m_max[index]),
    };
  });
}


export async function fetchWeatherForecast(
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
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&precipitation_unit=inch&timeformat=unixtime",
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
      wind_gusts_10m: windGust,
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
      windGust:Math.round(windGust),
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
