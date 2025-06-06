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


export async function fetchLighthouseRanges() {
  try {
    const data = await sql<LighthouseType>
    `SELECT 
            lighthouse.id, 
            lighthouse.name, 
            lighthouse.range_w,
            lighthouse.range_r
      FROM lighthouse
      ORDER BY lighthouse.range_w`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lighthouse location data.');
  }
}

export async function fetchLighthouseABWMetrics() {
  try {
    const data = await sql<LighthouseType>
    `SELECT 
            lighthouse.id, 
            lighthouse.name, 
            lighthouse.abovewater
      FROM lighthouse
      ORDER BY lighthouse.abovewater`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lighthouse location data.');
  }
}

export async function fetchLighthouseTowerMetrics() {
  try {
    const data = await sql<LighthouseType>
    `SELECT 
            lighthouse.id, 
            lighthouse.name, 
            lighthouse.towerheight
      FROM lighthouse
      ORDER BY lighthouse.towerheight`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lighthouse location data.');
  }
}

export async function fetchLighthouseAges() {
  try {
    const data = await sql<LighthouseType>
    `SELECT 
            lighthouse.id, 
            lighthouse.name, 
            lighthouse.constructed,
            lighthouse.currentdate,
            (lighthouse.currentdate - lighthouse.constructed)/365 AS "age"
      FROM lighthouse
      ORDER BY age`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lighthouse location data.');
  }
}


// export async function fetchLighthouse(
//   query: string,
// ) {
//   try {
//     const data = await sql<LighthouseType>
//     `SELECT 
//             lighthouse.id, 
//             lighthouse.name, 
//             lighthouse.latitude, 
//             lighthouse.longitude,
//             lighthouse.abovewater,
//             lighthouse.towerheight, 
//             lighthouse.range_w,
//             lighthouse.range_r,
//             lighthouse.coast,
//             lighthouse.constructed,
//             lighthouse.currentdate,
//             (lighthouse.currentdate - lighthouse.constructed)/365 AS "age",
//             lighthouse.image_url
//      FROM lighthouse
//      WHERE
//         lighthouse.id ILIKE ${`%${query}%`}
//         ORDER BY lighthouse.name`;
//     return data.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch lighthouse location data.');
//   }
// }


const ITEMS_PER_PAGE = 5;
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
            lighthouse.abovewater,
            lighthouse.towerheight, 
            lighthouse.range_w,
            lighthouse.range_r,
            lighthouse.coast,
            lighthouse.constructed,
            lighthouse.currentdate,
            (lighthouse.currentdate - lighthouse.constructed)/365 AS "age",
            lighthouse.image_url
     FROM lighthouse
     WHERE
        lighthouse.name ILIKE ${`%${query}%`}
        ORDER BY lighthouse.name
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
  currentMarine: CurrentMarineType;
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
      currentMarine: parseCurrentMarineForecast(response.data),
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
    waveHeight: waveHeight,
    wind_wave_height: wind_wave_height,
    swell_wave_height: swell_wave_height,
    wave_direction: Math.round(wave_direction),
    wave_period: wave_period,
    ocean_current_velocity: ocean_current_velocity,
    ocean_current_direction: ocean_current_direction,
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
  startDate: string,
  endDate: string
): Promise<{
  daily: DailyHistoricaltWeatherType[];
  errorMessage?: string;
}> {
  try {
    const response = await axios.get("https://archive-api.open-meteo.com/v1/archive?daily=wind_speed_10m_max,wind_gusts_10m_max", {
      params: {
        latitude: lat,
        longitude: lon,
        timezone,
        start_date: startDate,
        end_date: endDate,
      },
    });

    return {
      daily: parseHistoricalDailyWeather(response.data),
    };
  } catch (error:any) {
    console.error("Error fetching historical weather data:", error);
    // Check if the error is an Axios error
    const errorMessage = error.response 
      ? `Error: ${error.response.status} - ${error.response.data.message || 'Request failed'}`
      : 'An error occurred while fetching the historical weather data. Please try again later.';

    // Return the error message to be displayed
    return {
      daily: [],  // Return an empty array in case of error
      errorMessage,
    };
  }
}

function parseHistoricalDailyWeather({ daily }: any): DailyHistoricaltWeatherType[] {
  // console.log("Daily historical time.....",daily.time);
  return daily.time.map((time: number, index: number) => {
    return {
      timestamp: time, //second to milliseconds
      wind: Math.round(daily.wind_speed_10m_max[index]),
      gust: Math.round(daily.wind_gusts_10m_max[index]),
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
    hourlyWeather: HourlyWeatherType[];
  }> {
  
    return await axios
      .get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,weather_code,wind_speed_10m,wind_gusts_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&precipitation_unit=inch&timeformat=unixtime",
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
          hourlyWeather: parseHourlyWeather(response.data),
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
    // console.log("currentTime....",current.time);
    return hourly.time
      .map((time: number, index: number) => {
        return {
          timestamp: time * 1000,
          iconCode: hourly.weather_code[index],
          maxTemp: Math.round(hourly.temperature_2m[index]),
          feelsLike: Math.round(hourly.apparent_temperature[index]),
          windSpeed: Math.round(hourly.wind_speed_10m[index]),
          precip: Math.round(hourly.precipitation[index] * 100) / 100,
          visibility: Math.round(hourly.visibility[index])
        };
      })
      .filter(({ timestamp }: any) => timestamp <= current.time * 1000);
  }
