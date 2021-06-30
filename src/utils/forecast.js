const request = require('request');

const forecast = (lat, lon, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=6161e12360ab72f6822883a922586a95&query=" + lat + "," + lon;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather services.", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, "It is currently " + body.current.temperature + " degrees celsius outside. It feels like " + body.current.feelslike + " degrees, the humidity is " + body.current.humidity + "% and the weather is described as " + body.current.weather_descriptions[0].toLowerCase() + ".")
        }
    })

}

module.exports = forecast;