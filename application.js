// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const express = require('express');
const bodyParser = require("body-parser");
const apiShopRoutes = require('./APIRoutes/shop_routes');

const app = express();
// Middlewares
app.use(bodyParser.json());

// Products routes
app.use('/shop', apiShopRoutes);


module.exports = app;