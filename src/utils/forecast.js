const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e1105350b5f7ed80f0f67e48a05cf6d9&units=metric`

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find the location, try another search!', undefined)
        } else {
            const { temp } = body.main
            const { description } = body.weather[0]

            callback(undefined, {
                forecast: `${description} and it is currently ${temp} degrees out.`
            })
        }
    })
}

module.exports = forecast