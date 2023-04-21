const express = require('express');
const app = express();

const Auth = require('./routes/auth');

app.use('/', Auth)

const PORT = process.env.PORT || 5000;
app.listen(PORT);