'user strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// mongo connection
// mongoose.connect('');

const Product = require('./models/product');

// routes
const indexRoutes = require('./routes/index-route');
const productRoutes = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;