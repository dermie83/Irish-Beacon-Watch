// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DetailedHTMLProps, HTMLAttributes } from "react";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type LighthouseType = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  aboveWater:number;
  towerHeight:number;
  range:number;
  greatLighthouse:boolean;
  constructed:string;
  currentDate:string;
  age:number;
  image_url:string;
};


export type WeatherHeaderProps = {
  currentTemp: number | undefined;
  highTemp: number | undefined;
  lowTemp: number | undefined;
  highFeelsLike: number | undefined;
  lowFeelsLike: number | undefined;
  windSpeed: number | undefined;
  windGust: number | undefined;
  precip: number | undefined;
  iconCode: number | undefined;
  visibility: number | undefined;
  name: string | undefined;
};

export type DayCardWeatherProps = {
  iconCode: number | undefined;
  timestamp: number | undefined;
  degree: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export type TableRowWeatherProps = {
  timestamp: number | undefined;
  iconCode?: number | undefined;
  maxTemp: number | undefined;
  feelsLike: number | undefined;
  windSpeed: number | undefined;
  precip: number | undefined;
};

export type MarineHeaderProps = {
  waveHeight: number | undefined;
  wind_wave_height: number | undefined;
  swell_wave_height: number | undefined;
  wave_direction: number | undefined;
  wave_period: number | undefined;
  ocean_current_velocity: number | undefined;
  ocean_current_direction: number| undefined;
};

export type HourlyMarineType = {
  timestamp: string;
  waveHeight: number;
};

export type CurrentMarineType = {
  waveHeight: number;
  wind_wave_height: number;
  swell_wave_height: number;
  wave_direction: number;
  wave_period: number;
  ocean_current_velocity: number;
  ocean_current_direction: number;
};

export type DailyHistoricaltWeatherType = {
  timestamp: string;
  maxWind: number;
  maxGust: number;
};

export type WeatherDetailProps = {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
};

export type CurrentWeatherType = {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  highFeelsLike: number;
  lowFeelsLike: number;
  windSpeed: number;
  windGust:number;
  precip: number;
  iconCode: number;
};

export type DailytWeatherType = {
  timestamp: number;
  iconCode: number;
  maxTemp: number;
};

export type HourlyWeatherType = {
  timestamp: number;
  iconCode: number;
  maxTemp: number;
  feelsLike: number;
  windSpeed: number;
  precip: number;
  visibility: number;
};
