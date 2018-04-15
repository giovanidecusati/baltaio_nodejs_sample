'user strict'

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const app = express()

// mongo connection
mongoose.connect(config.connectionString)

// Register Schemas
const Product = require('./models/product')
const Order = require('./models/order')
const Customer = require('./models/customer')

// routes
const indexRoutes = require('./routes/index-route')
const productRoutes = require('./routes/product-route')
const customerRoutes = require('./routes/customer-route')
const orderRoutes = require('./routes/order-route')

// app.use(bodyParser.json({
//   limit: '5mb'
// }))

// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// )

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// Routes
app.use('/', indexRoutes)
app.use('/products', productRoutes)
app.use('/customers', customerRoutes)
app.use('/orders', orderRoutes)

module.exports = app
