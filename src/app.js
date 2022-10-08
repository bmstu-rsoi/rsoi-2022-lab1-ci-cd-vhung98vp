const express = require('express');
const router = require('./routes/persons');

const app = express();
app.use(express.json());

app.use('/api/v1/persons', router);

module.exports = app;