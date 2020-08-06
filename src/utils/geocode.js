const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY2Fpbmd3YXNpcmEiLCJhIjoiY2tkYnIxZGlvMTk5dzJ4cGN5bXdqYzRlMSJ9.JwGSM5yep_lTz1yI5yU6zQ`
    request({ url: url, json: true}, (error, { body } = {} ) => {
        if(error) {
            callback('Unable to connect to location services, please check your internet connection!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const { place_name} = body.features[0]
            callback(undefined, {
                latitude,
                longitude,
                place_name
            })
        }
    })
}

module.exports = geocode