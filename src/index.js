const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(bodyParser.json());

app.get('/:name', (req, res) => {
    res.send({message: `Hola ${req.params.name}`}) //"<h1>Hello World!</h1>"
});

app.listen(PORT, () => {
    console.log(`Web server listening on port ${PORT}`)
});
// Web server created