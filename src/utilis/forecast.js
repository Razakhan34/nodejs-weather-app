const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c893b22d954fc606cdbafab7b91c3e86&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    try {
      if (error) throw new Error("Unable to connect with weatherstack service");
      if (response.body.error)
        throw new Error("Unable to find location , try another search");
      const data = response.body.current;
      const forecastData = `It is ${data.weather_descriptions[0]} today . It is currently ${data.temperature} degree out . it feels like ${data.feelslike} degree out.There is a ${data.precip}% chance of rain and humidity level is ${data.humidity}%. The wind speed is ${data.wind_speed}km/hr.`;
      callback(undefined, forecastData);
    } catch (err) {
      callback(err.message, undefined);
    }
  });
};

module.exports = forecast;
