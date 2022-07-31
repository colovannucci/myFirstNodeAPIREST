// Use restrictive JS mode to avoid silence errors of the project
'use strict'

// Call MongoDB model
const productModelDB = require('../DBModels/product_model');

function getAllProducts (req, res) {
    // Search for products without any query parameters
    productModelDB.find({}, (err, productsFound) => {
        if (err) return res.status(500).send({ message: `Error getting all products: ${err}` });
        if (!productsFound) return res.status(404).send({ message: `There are no products availables` });
        
        res.status(200).send({ products: productsFound });
    });
}

function getProduct (req, res) {
    const productId = req.params.productId;

    // Search in DB products
    productModelDB.findById(productId, (err, productFound) => {
        if (err) return res.status(500).send({ message: `Error getting product: ${err}` });
        // Check if product already exists
        if (!productFound) return res.status(404).send({ message: `Product ${productId} doesn't exists` });

        res.status(200).send({ product: productFound}); 
    });
}

function createProduct (req, res) {
    // Declare new product object with data received
    const newProduct = new ProductModelDB();
    newProduct.name = req.body.name;
    newProduct.picture = req.body.picture;
    newProduct.price = req.body.price;
    newProduct.category = req.body.category;
    newProduct.description = req.body.description;

    // Store new product in DB
    newProduct.save( (err, productCreated) => {
        if (err) res.status(500).send( { message: `Error saving new product: ${err.message}` } );

        res.status(201).send({ message: 'El producto se ha creado correctamente', product: productCreated });

    });
}

function updateProduct (req, res) {
    const productId = req.params.productId;
    const updateInformation = req.body;

    productModelDB.findByIdAndUpdate(productId, updateInformation, (err, productUpdated) => {
        if (err) return res.status(500).send({ message: 'Error updating product' });
        if (!productUpdated) return res.status(404).send({ message: 'Product not found' });

        res.status(200).send({ message: 'El producto se ha actualizado correctamente' });
    });
}

function deleteProduct (req, res) {
    const productId = req.params.productId;
    // Search the product
    productModelDB.findById(productId, (err, productFound) => {
        if (err) return res.status(500).send({ message: `Error getting product ${err}`});
        if (!productFound) return res.status(404).send({ message: `Product ${productId} not found` });
        
        productFound.remove(err => {
            if (err) return res.status(500).send({message: `Error removing product: ${err}`});

            res.status(200).send({ message: 'El producto se ha eliminado correctamente' });
       });
    });
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}