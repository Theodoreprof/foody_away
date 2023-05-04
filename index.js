const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
require('./models/User');

mongoose.connect(process.env.mongoURI);

const app = express();

const Auth = require('./services/auth');

app.use('/auth', Auth)

app.get('/', (req, res) => {
    res.send({hi : 'world'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);