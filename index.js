const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require("dotenv").config();
require('./models/User');

mongoose.connect(process.env.mongoURI);

const app = express();

app.use(
    cookieSession({
        //30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey]
    }));

app.use(passport.initialize());
app.use(passport.session());

const Auth = require('./services/auth');


app.use('/auth', Auth);

app.get('/', (req, res) => {
    res.send({hi : 'world'});
});

app.get('/success', (req, res) => {
    res.send({hi : 'succesful callback'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);