const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
    res.status(200).send({ products: [] });
});

app.get('/api/products/:productId', (req, res) => {

});

app.post('/api/products', (req, res) => {
    console.log(req.body);
    res.status(201).send({ message: 'El producto se ha recibido' });
});

app.put('/api/products', (req, res) => {
    
});

app.delete('/api/products/:productId', (req, res) => {
    
});

// Si ninguna coincide manda esto
app.use('*', (req, res) => {
    res.status(404).send("Parece que te has perdido");
});

app.listen(PORT, () => {
    console.log(`Web server listening on port ${PORT}`)
});
// Web server created