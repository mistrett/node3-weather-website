const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup view engine and location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static assets directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {title: 'Weather'})
})

app.get('/about', (req, res) => {
  res.render('about', {title: 'About me'})
})

app.get('/help', (req, res) => {
  res.render('help', {title: 'Help page', helpMessage: 'This is my help message'})
})

app.get('/weather', (req, resp) => {
  if(!req.query.address) {
    return resp.send({error: 'You must provide an address!'})
  }

  const address = req.query.address

  geocode(address, (error, {longitude, latitude, location} = {}) => {

    if(error) {
      return resp.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return resp.send({error})
      }

      resp.send({location, forecast: forecastData, address})

    })
  })

  // resp.send({location: req.query.address, forecast: 'bla bla'})
})

app.get('/products', (req, res) => {
  res.send({products: []})
})

app.get('/help/*', (req, resp) => {
  resp.render('404', {title: 'Help article not found', errorMessage: 'Page article not found'})
})

app.get('*', (req, resp) => {
  resp.render('404', {title: '404 - Page not found', errorMessage: 'Page not found'})
})

app.listen(port, () => {
  console.log('Server is up on port 3000')
})