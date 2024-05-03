require('dotenv').config()
const express = require('express')
const { con } = require('./config/db');

const app = express()

// Create a route
app.get('/', (req, res) => {
    res.send('Hello World!!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));