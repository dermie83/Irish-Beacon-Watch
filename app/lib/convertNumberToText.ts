

export function convertVisibilityToText(visibility:number) {
 
  if (visibility < 50)
  {
      return "Dense Fog";
  }
  if ((visibility >= 50) && (visibility < 200))
  {
      return "Thick Fog";
  }
  if ((visibility >= 200) && (visibility < 500))
  {
      return "Moderate Fog";
  }
  if ((visibility >= 500) && (visibility < 1000))
  {
      return "Light Fog";
  }
  if ((visibility >= 1000) && (visibility < 2000))
  {
      return "Thin Fog";
  }
  if ((visibility >= 2000) && (visibility < 4000))
  {
      return "Haze";
  }
  if ((visibility >= 4000) && (visibility < 10000))
  {
      return "Light Haze";
  }
  if ((visibility >= 4000) && (visibility < 10000))
  {
      return "Light Mist";
  }
  if ((visibility >= 10000) && (visibility < 20000))
  {
      return "Clear";
  }
  if ((visibility >= 20000) && (visibility < 50000))
  {
       return "Very clear";
  }
  if (visibility >= 50000)
  {
      return "Exceptionally Clear";
  }
  return "None";
}

export function convertWindDirectionToText(windDirection:number) {
 
  if (((windDirection >= 0.0) && (windDirection <= 11.25))
      || ((windDirection > 348.75) && (windDirection <= 360.0)))
  {
      return "N";
  }
  if ((windDirection > 11.25) && (windDirection <= 33.75))
  {
      return "NNE";
  }
  if ((windDirection > 33.75) && (windDirection <= 56.25))
  {
      return "NE";
  }
  if ((windDirection > 56.25) && (windDirection <= 78.75))
  {
      return "ENE";
  }
  if ((windDirection > 78.75) && (windDirection <= 101.25))
  {
      return "E";
  }
  if ((windDirection > 101.25) && (windDirection <= 123.25))
  {
      return "ESE";
  }
  if ((windDirection > 123.25) && (windDirection <= 146.25))
  {
      return "SE";
  }
  if ((windDirection > 146.25) && (windDirection <= 168.75))
  {
      return "SSE";
  }
  if ((windDirection > 168.75) && (windDirection <= 191.25))
  {
      return "S";
  }
  if ((windDirection > 191.25) && (windDirection <= 213.75))
  {
      return "SSW";
  }
  if ((windDirection > 213.75) && (windDirection <= 236.25))
  {
      return "SW";
  }
  if ((windDirection > 236.25) && (windDirection <= 258.75))
  {
      return "WSW";
  }
  if ((windDirection > 258.75) && (windDirection <= 281.25))
  {
      return "W";
  }
  if ((windDirection > 281.25) && (windDirection <= 303.75))
  {
      return "WNW";
  }
  if ((windDirection > 303.75) && (windDirection <= 326.25))
  {
      return "NW";
  }
  if ((windDirection > 326.25) && (windDirection <= 348.75))
  {
      return "NNW";
  }
      return "No Wind Direction";
  }

