// Use restrictive JS mode to avoid silence errors of the project
'use strict'

// Require dotenv for environment variables
require('dotenv').config();
const jwt = require('jsonwebtoken');

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const apiShopRoutes = require('./APIRoutes/shop_routes');
const bcrypt = require('bcrypt');

// Middlewares
app.use(bodyParser.json());

// Specify that files with .hbs extension should use express-handlebars
// Shopping routes
app.use('/shop', apiShopRoutes);

// Password login

const users = []

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    console.log('password received: ', req.body.password);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    res.status(500).send('Error:' + err);
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      
        // JWT authentication
        res.send('Success')
        

    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

// JWT authentication


module.exports = app;