const express = require('express')
const router = require('../routes/bankRoutes')
const path = require('path')
const hbs = require('hbs')

app = express()
app.use( express.static( path.join(__dirname, '../frontend/static') ))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, '../frontend/views'))
app.use(express.urlencoded({extended:true}))
app.use(router)
hbs.registerPartials( path.join(__dirname, '../frontend/layouts'))

module.exports = app