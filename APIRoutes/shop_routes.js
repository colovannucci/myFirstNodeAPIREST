// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const express = require('express');
const apiShopRoutes = express.Router();
const productController = require('../Controllers/product_controller');

// Products routes
// Get all products
apiShopRoutes.get('/products', productController.getAllProducts);
// Get specific product
apiShopRoutes.get('/products/:productId', productController.getProduct);
// Add a product
apiShopRoutes.post('/products', productController.createProduct);
// Update a product
apiShopRoutes.put('/products/:productId', productController.updateProduct);
// Delete a product
apiShopRoutes.delete('/products/:productId', productController.deleteProduct);

// Si ninguna ruta coincide ninguna route manda esto
apiShopRoutes.use('*', (req, res) => {
    res.status(404).send("Parece que te has perdido");
});

module.exports = apiShopRoutes;