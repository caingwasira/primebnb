const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// static directory
app.use(express.static(path.join(__dirname, '../public')))

// handlebars engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'How can we help?'
    })
})

app.get('/api/weather/endpoint', (req, res) => {
    if(req.url === '/api/weather/endpoint') {
        return res.render('404', {
            code: 404,
            message: 'Page not found'
        })
    }
    const { address } = req.query
    if(!address) return res.send({ error: 'Please provide an address'})

    geocode(address, (error, { latitude, longitude, place_name } = {} ) => {
        if(error) return res.send({ error })
        forecast(latitude, longitude, (error, { temp, forecast}) => {
            if(error) return res.send({ Error: 'Unable to find the location'})
            res.send({
                forecast,
                place_name,
                address
            })
        })
        
    })
    
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/dev/admin', (req, res) => {
    res.render('dev', {
        title: 'Developer page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        code: '404',
        message: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        code: '404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})