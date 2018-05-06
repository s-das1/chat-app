const nlp = require('compromise');
const axios = require('axios');

var weatherLocation;

var searchMessageForWeather = (message, callback) => {
    var keywordWeather = message.search(/weather/i);
    
    if (keywordWeather === -1) {
      return callback('');
    }
  
    var encodedAddress = nlp(message).places().out().trim();
    //Need to prevent execution if no place is founD
      
  if (encodedAddress.length === 0) {
      return callback('');
    }
  
    //Print to arrays
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAPXh3tAsWLINZ_ZuYx5AY7FPW3w5f0WDc`;
    
    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }

      weatherLocation = response.data.results[0].formatted_address;
      var lat = response.data.results[0].geometry.location.lat;
      var lng = response.data.results[0].geometry.location.lng;
      var weatherUrl = `https://api.forecast.io/forecast/bf4b3358d7c0f46c179bcc47578e64bf/${lat},${lng}`;
      return axios.get(weatherUrl);
    }).then((response) => {
      
      
      var temperature = ((response.data.currently.temperature - 32)*(5/9)).toFixed(1);
      var weatherDataMessage = `In ${weatherLocation}, it is currently ${temperature}°C.`;
      
      //console.log(weatherDataMessage);
      callback (weatherDataMessage);
      
    }).catch((e) => {
      if (e.code === 'ENOTFOUND') {
        return console.log('Unable to connect to API servers.');
      } else {
        return console.log(e.message);
      }
    });
};


module.exports = {searchMessageForWeather};