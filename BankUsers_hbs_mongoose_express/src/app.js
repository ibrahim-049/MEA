const express = require('express')
const app = express()
const customerRoutes = require('../routes/customerRoutes')
const path = require('path')
const hbs = require('hbs')
require('../models/dbConnection')


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../frontend/views'))
app.use( express.static( path.join(__dirname, '../frontend/static') ))

hbs.registerPartials(path.join(__dirname, '../frontend/layout'))
app.use(customerRoutes)

module.exports = app