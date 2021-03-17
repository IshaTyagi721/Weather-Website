// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=ab8c6ca8a987a9e52ee3d3b950a955ac&query='+ latitude + ',' + longitude +'units=f'

//     request({ url : url, json : true}, (error, response) => {
//         if(error){
//             callback("Unable to find location", undefined)
//         }
//         else if(response.body.error){
//             callback("Unable to access location", undefined)
//         }
//         else{
//             callback(undefined, response.body.current.weather_descriptions +". It's currently" + " " + response.body.current.temperature + " "  + "feels like" +  " " +response.body.current.feelslike)
//         }

//     })
// }

// module.exports = forecast

const request = require('request')

const forecast = (latitude, longitude, callback) => {
   // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'http://api.weatherstack.com/current?access_key=ab8c6ca8a987a9e52ee3d3b950a955ac&query='+ latitude + ',' + longitude +'units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions +". It's currently" + " " + body.current.temperature +" "+"Fahrenheit")
        }
    })
}

module.exports = forecast