const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// Express is a function
const express = require('express')
// console.log(__dirname)
//console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//Express application
const app = express()

//Renaming views as templates
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//Setting up static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {           //This needs to match with the name of file created in views
        title : 'Weather',
        name : 'Isha Tyagi'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Isha Tyagi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext : 'This is some helpful text',
        title : 'Help',
        name : 'Isha Tyagi'
    })
})

// app.get('', (req, res) => {
//     res.send("<h1> Weather </h1>")
// })

// app.get('/help', (req, res) => {
//     res.send("Help Page")
// })

// app.get('/about', (req, res) => {
//     res.send("About")
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get
//Use the wildcard symbol for 404 pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Isha Tyagi',
        errorMessage : 'Help message not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Isha Tyagi',
        errorMessage : 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})