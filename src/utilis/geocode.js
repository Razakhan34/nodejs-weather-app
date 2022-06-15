const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://geocode.xyz/${encodeURIComponent(
    address
  )}?json=1&auth=953300079954694952764x113421`;
  request({ url: url, json: true }, (error, response) => {
    try {
      if (error)
        throw new Error(
          "Something went wrong , please check your internet connection"
        );
      // throw new Error("Unable to connect with geocode service api !");
      if (response.body.error)
        throw new Error("Unable to find location , try another search");
      const latitude = response.body.latt;
      const longitude = response.body.longt;
      const location = `${response.body.standard?.city} , ${response.body.standard?.countryname} `;
      callback(undefined, { latitude, longitude, location });
    } catch (err) {
      callback(err.message, undefined);
    }
  });
};
module.exports = geoCode;
