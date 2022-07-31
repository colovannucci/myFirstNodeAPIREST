// Use restrictive JS mode to avoid silence errors of the project
'use strict'

const mongoose = require('mongoose');
const app = require('./application');
const config = require('./configuration');

// MondoDB connection
mongoose.connect(config.db, (err, res) => {
    if (err) { return console.log(`Error connecting to database: ${err}`)};
    console.log('Connected to MongoDB');

    // Server connection
    app.listen(config.port, () => {
        console.log(`Web server listening on port ${config.port}`)
    });
    // Web server created
});
