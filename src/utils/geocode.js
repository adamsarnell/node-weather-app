const request = require('request');

const geocode = (address, callback) => {
   
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2FybmVsbGt0aCIsImEiOiJja3FnZWw5cXEwMGdqMnVseWV1bXl5c3p1In0.ilXTaudv7wTnvovUxXg3sQ&limit=1"
   
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            console.log(error)
            callback("Unable to connect to location services.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }

    })
}

module.exports = geocode;