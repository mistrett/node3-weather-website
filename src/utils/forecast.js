const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/974ebbd2b91f9c83071eb46038b7f74c/'+latitude+',' + longitude + '?units=si&lang=it';

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to weather service!')
    } else if(body.error) {
      callback('Unable to find location!')
    } else {
      const currently = body.currently
      const daily = body.daily
      const precipProbability = currently.precipProbability
      const degree = currently.temperature

      callback(undefined, daily.data[0].summary + 'It is currently ' + degree + ' degrees out [' + daily.data[0].temperatureLow + '°, ' + daily.data[0].temperatureHigh + '°]. There is a ' + precipProbability + '% chance of rain.')
    }
  })
}

module.exports = forecast