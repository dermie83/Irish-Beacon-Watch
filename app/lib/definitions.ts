// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { DetailedHTMLProps, HTMLAttributes } from "react";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type LighthouseProps = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};


export type HeaderProps = {
  currentTemp: number | undefined;
  highTemp: number | undefined;
  lowTemp: number | undefined;
  highFeelsLike: number | undefined;
  lowFeelsLike: number | undefined;
  windSpeed: number | undefined;
  precip: number | undefined;
  iconCode: number | undefined;
};

export type dayCardProps = {
  iconCode: number | undefined;
  timestamp: number | undefined;
  degree: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export type TableRowProps = {
  timestamp: number | undefined;
  iconCode?: number | undefined;
  maxTemp: number | undefined;
  feelsLike: number | undefined;
  windSpeed: number | undefined;
  precip: number | undefined;
};

export type WeatherDetailProps = {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export type CurrentWeatherType = {
  currentTemp: number;
  highTemp: number;
  lowTemp: number;
  highFeelsLike: number;
  lowFeelsLike: number;
  windSpeed: number;
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
};
