const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Call MongoDB model
const productModelDB = require('./models/product');

// Specify server fields
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(bodyParser.json());

// Routes

// Get all products
app.get('/api/products', (req, res) => {
    productModelDB.find({}, (err, productsFound) => {
        if (err) return res.status(500).send({ message: `Error getting all products: ${err}` });
        if (!productsFound) return res.status(404).send({ message: `There are no products availables` });
        
        res.status(200).send({ products: productsFound });
    });
});

// Get specific product
app.get('/api/products/:productId', (req, res) => {
    const productId = req.params.productId;

    // Search in DB products
    productModelDB.findById(productId, (err, productFound) => {
        if (err) return res.status(500).send({ message: `Error getting product: ${err}` });
        // Check if product already exists
        if (!productFound) return res.status(404).send({ message: `Product ${productId} doesn't exists` });

        res.status(200).send({ product: productFound}); 
    });
});

app.post('/api/products', (req, res) => {
    /*
    console.log(req.body);
    res.status(201).send({ message: 'El producto se ha recibido' });
    */
    console.log('POST /api/products');
    console.log(req.body);

    // Declare new product object with data
    const newProduct = new productModelDB();
    newProduct.name = req.body.name;
    newProduct.picture = req.body.picture;
    newProduct.price = req.body.price;
    newProduct.category = req.body.category;
    newProduct.description = req.body.description;

    // Store new product in DB
    newProduct.save( (err, productStored) => {
        if (err) res.status(500).send( { message: `Error saving new product: ${err.message}` } );

        res.status(201).send({ message: 'El producto se ha creado correctamente', product: productStored });

    });
});

app.put('/api/products', (req, res) => {
    
});

app.delete('/api/products/:productId', (req, res) => {
    
});

// Si ninguna coincide manda esto
app.use('*', (req, res) => {
    res.status(404).send("Parece que te has perdido");
});

// MondoDB connection
mongoose.connect('mongodb://localhost:27017/shops', (err, res) => {
    if (err) { return console.log(`Error connecting to database: ${err}`)};
    console.log('Connected to MongoDB');

    // Server connection
    app.listen(PORT, () => {
        console.log(`Web server listening on port ${PORT}`)
    });
    // Web server created
});
